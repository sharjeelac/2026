import User from '../models/User.js'
import jwt, { decode } from 'jsonwebtoken'

export const register = async (req, res) => {
    console.log("register")
    try {
        const { username, password } = req.body

        const user = await User.create({ username, password })

        res.status(201).json({ message: "User Created", userId: user._id })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const newUser = await User.findOne({ username })

        if (!newUser || newUser.password !== password) {
            return res.status(401).json({ message: "Wrong Credential" })
        }

        const accessToken = jwt.sign({ userId: newUser._Id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" })
        const refreshToken = jwt.sign({ userId: newUser._Id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" })

    }

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden : Token Expire" })

            const accessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15s" }
            )

            res.json({ accessToken })
        }

    )
}

export const logout = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204)

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,

    })

    res.json({ message: "Cookie Clear" })
}