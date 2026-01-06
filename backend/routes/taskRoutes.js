import express from 'express';
import {getAllTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taskController.js';
import { stringToDateMiddleware } from '../middleware/stringToDateMiddleware.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';

const router = express.Router();

// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera Taskow.');
    next();
});

router.get('/', authTokenMiddleware, getAllTasks);

router.get('/:id', authTokenMiddleware, getTask);

router.post('/', authTokenMiddleware, stringToDateMiddleware, createTask);

router.put('/:id', authTokenMiddleware, stringToDateMiddleware, updateTask);

router.delete('/:id', authTokenMiddleware, deleteTask);
export default router;