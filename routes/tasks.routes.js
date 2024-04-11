import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
import authMiddleware from '../middlewares/Auth.js';

// Routes for task management
router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, createTask);
router.get('/:taskId', authMiddleware, getTaskById);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

export default router;
