import Task from '../models/Task.js';
import jwt from 'jsonwebtoken';

const getAllTasks = async (req, res) => {
    try {
        // Extract user ID from JWT token
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, 'secret');
        const userId = decoded.userId;
        const tasks = await Task.findAll({
            where: {
              userId: userId
            }
          });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        // Extract user ID from JWT token
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, 'secret');
        const userId = decoded.userId;

        // Create task with associated user ID
        const { title, description } = req.body;
        const newTask = await Task.create({ title, description, userId });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title, description } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = title;
        task.description = description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.status(200).json({message:'Task deleted successfully' }).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getAllTasks, createTask, getTaskById, updateTask, deleteTask };
