import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { register, login, refresh, logout, profile } from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout)
router.get('/profile', authMiddleware, profile)


export default router