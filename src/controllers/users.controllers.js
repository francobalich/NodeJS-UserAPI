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
        message: "No existe un usuario con ese email."
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "La contraseña es incorrecta."
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
      password: usuario.password,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const postRegisterUser = async (req, res = response) => {
  const { name, surname, email, password } = req.body
  try {
    let usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        status: false,
        message: "Ya existe un usuario con ese email."
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
      password: usuario.password,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const putModifiedUser = async (req, res = response) => {
  const id  = req.params.id
  const { password } = req.body
  try {
    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(400).json({
        status: false,
        message: "No existe un usuario con ese ID."
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
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id,nuevoUsuario,{new:true})
    return res.status(201).json({
      status: true,
      uid: usuarioActualizado.id,
      name: usuarioActualizado.name,
      surname: usuarioActualizado.surname,
      email: usuarioActualizado.email,
      password: usuarioActualizado.password,
      message:"The user was modificated.",
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Some error happened')
  }
}

export const deleteUser = async (req, res = response) => {
  const id  = req.params.id
  try {
    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(400).json({
        status: false,
        message: "No existe un usuario con ese ID."
      })
    }
    const usuarioEliminado = await Usuario.findByIdAndDelete(id)

    return res.status(201).json({
      status: true,
      uid: usuarioEliminado.id,
      name: usuarioEliminado.name,
      surname: usuarioEliminado.surname,
      email: usuarioEliminado.email,
      password: usuarioEliminado.password,
      message:"The user was eliminated.",
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