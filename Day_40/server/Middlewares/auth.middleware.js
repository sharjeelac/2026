import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']

        // 1. Header Check
        if (!authHeader) {
            return res.status(401).json({ message: "Token Not Found" })
        }

        // 2. Token Extract (Bearer <token>)
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token missing" })
        }

        // 3. Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // 4. FIX: Store entire decoded object in req.user
        // Isse hum controller me 'req.user.userId' use kar payenge
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        // 5. FIX: Typo 'statu' -> 'status'
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
}

export default authMiddleware