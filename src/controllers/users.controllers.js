import { response } from 'express'
import { generarJWT } from '../utils/jwt.js'
import { Usuario } from '../models/Usuario.js'
import bcrypt from 'bcryptjs'

export const getLogin = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "No existe un usuario con ese email."
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        status: false,
        msg: "La contraseña es incorrecta."
      })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.mail)

    return res.status(201).json({
      status: true,
      uid: usuario.id,
      name: usuario.name,
      surname: usuario.surname,
      email: usuario.email,
      images: usuario.images,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Un error sucedio en la base de datos.')
  }
}

export const postRegisterUser = async (req, res = response) => {
  const { name, surname, email, password } = req.body
  try {
    let usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        status: false,
        msg: "Ya existe un usuario con ese email."
      })
    }
    usuario = new Usuario({ name, surname, email, password })

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    await usuario.save()

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.mail)
    return res.status(201).json({
      status: true,
      uid: usuario.id,
      name: usuario.name,
      surname: usuario.surname,
      email: usuario.email,
      images: usuario.images,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const putModifiedUser = async (req, res = response) => {
  const id = req.params.id
  const { password } = req.body
  try {
    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "No existe un usuario con ese ID."
      })
    }
    const nuevoUsuario = {
      ...req.body,
      id
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    nuevoUsuario.password = bcrypt.hashSync(password, salt)

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.mail)
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, nuevoUsuario, { new: true })
    return res.status(201).json({
      status: true,
      uid: usuarioActualizado.id,
      name: usuarioActualizado.name,
      surname: usuarioActualizado.surname,
      email: usuarioActualizado.email,
      images: usuarioActualizado.images,
      msg: "The user was modificated.",
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const deleteUser = async (req, res = response) => {
  const id = req.params.id
  try {
    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "No existe un usuario con ese ID."
      })
    }
    const usuarioEliminado = await Usuario.findByIdAndDelete(id)

    return res.status(201).json({
      status: true,
      uid: usuarioEliminado.id,
      name: usuarioEliminado.name,
      surname: usuarioEliminado.surname,
      email: usuarioEliminado.email,
      msg: "The user was eliminated.",
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}
export const revalidarToken = async (req, res = response) => {
  const { uid, email } = req.body

  // Generar JWT
  const token = await generarJWT(uid, email)
  res.status(200).json({
    status: true,
    uid,
    email,
    token,
  })
}

export const putImagesUser = async (req, res = response) => {
  const { images, email } = req.body
  try {
    let usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "No existe un usuario con ese email."
      })
    }
    const nuevoUsuario = {
      id: usuario.id,
      name: usuario.name,
      surname: usuario.surname,
      email: usuario.email,
      password: usuario.password,
      images: images,
    }
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.mail)
    const usuarioActualizado = await Usuario.findByIdAndUpdate(nuevoUsuario.id, nuevoUsuario, { new: true })
    return res.status(201).json({
      status: true,
      uid: usuarioActualizado.id,
      name: usuarioActualizado.name,
      surname: usuarioActualizado.surname,
      email: usuarioActualizado.email,
      images: usuarioActualizado.images,
      msg: "The images were modificated.",
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const postReadImages = async (req, res = response) => {
  const { email } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "No existe un usuario con ese email."
      })
    }

    return res.status(201).json({
      status: true,
      uid: usuario.id,
      email: usuario.email,
      images: usuario.images,
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}