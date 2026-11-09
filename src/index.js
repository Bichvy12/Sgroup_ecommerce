import express from 'express'
import dotenv from 'dotenv'
import rootRouter from './routes/index.js'
import morgan from 'morgan'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js'
import { connectionDb } from './configs/db.config.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.get('/', (req, res) => {
  res.json({
    message: 'API Server is running!'
  })
})
app.use(morgan('combined'))
app.use('/api', rootRouter)
app.use(notFoundHandler)
app.use(errorHandler)
app.listen(PORT, "0.0.0.0",async () => {
  await connectionDb()
  console.log(`Server running on http://localhost:${PORT}`)
})
