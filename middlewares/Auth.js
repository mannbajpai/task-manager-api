import {JWT_SECRET} from "../config.env.js"
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Extract token from request headers
    const token = req.headers['authorization'];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET , (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Store decoded user information in request object
        req.user = decoded;
        next();
    });
};

export default authMiddleware;
