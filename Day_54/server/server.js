import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server Is Running`)
})