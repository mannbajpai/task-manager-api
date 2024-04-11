import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {JWT_SECRET} from "../config.env.js"
import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET , { expiresIn: '1h' });

        // Set token in a cookie
        res.cookie('jwtToken', token, { httpOnly: true }); // Set as HTTP-only to prevent XSS attacks

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        // Clear JWT token cookie
        res.clearCookie('jwtToken'); // Remove the cookie containing the JWT token
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { login, logout };
