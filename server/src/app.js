import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js'

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(clerkMiddleware())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
	connectDB()
})
