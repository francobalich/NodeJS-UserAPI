import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

// https://support.cloudinary.com/hc/en-us/articles/202521082-Listing-all-assets-within-a-folder

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

export const getAllImgs = async (req, res = response) => {
  try {
    const resp = await cloudinary.v2.search.expression(
      'folder:curso-react/*'
    ).sort_by('public_id', 'desc').max_results(30).execute();
    const data = resp.resources.map((image) => {
      return {
        filename: image.filename,
        format: image.format,
        url: image.secure_url,
      }
    })
    return res.status(201).json({
      status: true,
      total: resp.total_count,
      data
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}