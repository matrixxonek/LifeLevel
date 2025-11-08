import express from 'express';
import {getAllTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera Taskow.');
    next();
});

export default router;