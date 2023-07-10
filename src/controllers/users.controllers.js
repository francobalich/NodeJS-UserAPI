import { response } from 'express'
export const getLogin = async (req, res = response) => {
  try {
    return res.status(404).send({
      id: '0',
      state: false,
      respuesta: 'API Not Implemented (API User)'
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const postRegisterUser = async (req, res = response) => {
  try {
    return res.status(404).send({
      id: '0',
      state: false,
      respuesta: 'API Not Implemented (API User)'
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const putModifiedUser = async (req, res = response) => {
  try {
    return res.status(404).send({
      id: '0',
      state: false,
      respuesta: 'API Not Implemented (API User)'
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const deleteUser = async (req, res = response) => {
  try {
    return res.status(404).send({
      id: '0',
      state: false,
      respuesta: 'API Not Implemented (API User)'
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}
