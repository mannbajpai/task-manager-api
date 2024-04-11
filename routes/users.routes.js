import { Router } from 'express';
const router = Router();
import { register } from '../controllers/user.controller.js';

// Routes for user management
router.post('/register', register);

export default router;
