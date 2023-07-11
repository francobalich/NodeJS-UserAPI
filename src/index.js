import { corsConfig } from './middleware/corsConfig.js'
import { dbConnection } from './database/config.js'
import { userRouter } from './routes/users.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { imgsRouter } from './routes/imgs.routes.js'

dotenv.config()

const PORT = process.env.PORT || 3000

// Configuración del server
const app = express()
app.use(express.json())

// Base de datos
dbConnection()

// Configuración del cors
app.use(cors())
app.use(corsConfig)

// Rutas
app.use('/api/', userRouter)
app.use('/api/', imgsRouter)

// Endpoints
app.use('/', (req, res) => {
  return res.status(200).json({
    msg: 'Bienvenido al backend de manejo de usuarios.'
  })
})
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
})
app.listen(PORT, () =>
  console.log(`\x1B[34mServer running in \x1B[31m${PORT} port.\x1B[0m`)
)
