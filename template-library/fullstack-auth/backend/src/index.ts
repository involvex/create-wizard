/** @format */

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack-auth')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

// Routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
