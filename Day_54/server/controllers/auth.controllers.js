import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username or Password is Missing!", error: error.message })
        }
        const newUser = await User.create({ username, password })

        res.json({ message: "User Created", userId: newUser._id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went Wrong in the Server", error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        const checkPassword = password === user.password
        console.log(checkPassword)
        if (!user || !checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong credential",
            })
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15s" }
        )

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1h" })


        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })



        res.json({
            success: true,
            token: accessToken,
            message: "User Loggined",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong in the server",
            error: error.message
        })
    }
}

export const refresh = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            return res.status(401).json({ message: "Unauthorized No Token" })
        }

        const refreshToken = cookies.jwt
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" })
            }

            const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
            res.json({ message: "token refresh", token: accessToken })

        })


    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({ message: "something went wrong on server", success: false, error: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.json({ message: "Cookies Clear" })
    } catch (error) {

    }
}

export const profile = async (req, res) => {
    console.log(req.user)
    res.json({ message: "User Data Has Being Protected" })
}