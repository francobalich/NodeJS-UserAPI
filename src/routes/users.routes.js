import { check } from 'express-validator'
import { getLogin, postRegisterUser, putModifiedUser, deleteUser, revalidarToken, putImagesUser, postReadImages } from '../controllers/users.controllers.js'
import { Router } from 'express'
import { validarCampos } from '../middleware/validarCampos.js'
import { validarJWT } from '../middleware/validarJwt.js'

export const userRouter = Router()

userRouter.get('/renew', validarJWT, revalidarToken)

userRouter.post('/login',
  [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], getLogin)

userRouter.post('/register',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], postRegisterUser)

userRouter.put('/user/:id',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], putModifiedUser)

userRouter.put('/images',
  [
    check('images', 'Las imagenes son obligatorias.').not().isEmpty(),
    validarCampos
  ], putImagesUser)

userRouter.post('/images', postReadImages)

userRouter.delete('/:id', deleteUser)
