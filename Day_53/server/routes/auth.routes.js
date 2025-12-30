import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'

import { register, login, refresh, logout } from '../controllers/auth.controllers.js'

const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.get('/refresh', refresh)
router.post("/logout", logout)

router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "You are Authorized! 🔓", userId: req.user.userId });
});
export default router