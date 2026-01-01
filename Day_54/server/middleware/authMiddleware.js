import jwt from 'jsonwebtoken'
import { trusted } from 'mongoose'

const authMiddleware = async (req, res, next) => {
    try {
        const authHeaders = req.headers["authorization"]

        if (!authHeaders) {
            return res.status(401).json({ message: "No Token Provided" })
        }

        const token = authHeaders.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "invlid or expire token" })

            }

            req.user = decoded
            next()
        })
    } catch (error) {

    }
}

export default authMiddleware