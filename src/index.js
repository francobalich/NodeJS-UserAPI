import { corsConfig } from './middleware/corsConfig.js'
import { userRouter } from './routes/users.routes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT || 3000

// Configuración del server
const app = express()
app.use(express.json())

// Configuración del cors
app.use(cors())
app.use(corsConfig)

// Rutas
app.use('/api/', userRouter)

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
