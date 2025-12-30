import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 1. Header se token nikalo ('Bearer <token>')
    const authHeader = req.headers['authorization'];
    
    // Agar header hi nahi hai
    if (!authHeader) return res.status(401).json({ message: "No Token Provided" });

    // 'Bearer ' hatake sirf token lo
    const token = authHeader.split(' ')[1];

    // 2. Verify karo
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid or Expired Token" });
        
        req.user = decoded; // User ID request me chipka do
        next(); // Aage jane do
    });
};