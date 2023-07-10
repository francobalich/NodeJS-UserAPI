import { Router } from 'express'
import { getUser, postUser, putUser, deleteUser} from '../controllers/users.controllers.js'

export const userRouter = Router()

userRouter.get('/', getUser)

userRouter.post('/', postUser)

userRouter.put('/', putUser)

userRouter.delete('/', deleteUser)
