import { Router } from 'express'
import { getLogin, postRegisterUser, putModifiedUser, deleteUser} from '../controllers/users.controllers.js'

export const userRouter = Router()

userRouter.get('/', getLogin)

userRouter.post('/', postRegisterUser)

userRouter.put('/:id', putModifiedUser)

userRouter.delete('/:id', deleteUser)
