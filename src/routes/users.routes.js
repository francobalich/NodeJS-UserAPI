import { check } from 'express-validator'
import { getLogin, postRegisterUser, putModifiedUser, deleteUser, revalidarToken } from '../controllers/users.controllers.js'
import { Router } from 'express'
import { validarCampos } from '../middleware/validarCampos.js'
import { validarJWT } from '../middleware/validarJwt.js'

export const userRouter = Router()

userRouter.get('/renew',validarJWT,revalidarToken)

userRouter.get('/',
  [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], getLogin)

userRouter.post('/',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], postRegisterUser)

userRouter.put('/:id',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], putModifiedUser)

userRouter.delete('/:id', deleteUser)
