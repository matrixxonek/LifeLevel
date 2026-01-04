import express from 'express';
import {getAllTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taskController.js';
import { stringToDateMiddleware } from '../middleware/stringToDateMiddleware.js';

const router = express.Router();

// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera Taskow.');
    next();
});

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post('/', stringToDateMiddleware, createTask);

router.put('/:id', stringToDateMiddleware, updateTask);

router.delete('/:id', deleteTask);

export default router;