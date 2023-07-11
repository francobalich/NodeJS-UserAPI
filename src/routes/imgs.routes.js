import { Router } from 'express'
import { getAllImgs } from '../controllers/imgs.controller.js'

export const imgsRouter = Router()

imgsRouter.get('/img/all', getAllImgs)