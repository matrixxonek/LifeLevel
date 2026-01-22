import Task from '../models/taskModel.js';
import { taskTypeAddingMiddleware } from '../middleware/taskTypeAddingMiddleware.js';
import { processTaskCompletion } from '../services/rpgService.js';

export const getAllTasks = async (req, res)=>{
    console.log('--- KONTROLER TASKÓW ZOSTAŁ WYWOŁANY ---');
    try {
        const tasks = await Task.findAll({ 
            where: { userId: req.user.id } 
        });
        console.log('przed dodaniem typu: '+tasks);
        const typedTasks = taskTypeAddingMiddleware(tasks);
        console.log('po dodaniu typu: '+typedTasks);
        return res.status(200).json(typedTasks);
    } catch (error) {
        console.error('Błąd w kontrolerze Tasków:', error);
        return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
}

export const getTask = async (req,res)=>{
    console.log('test');
    try {
        const task = await Task.findOne({ 
            where: { id: req.params.id, userId: req.user.id } 
        });
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        const typedtask = taskTypeAddingMiddleware([task])[0];
        console.log(typedtask);
        return res.status(200).json(typedtask);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving Task', error: error.message });
    }
}

export const createTask = async (req,res)=>{
    try {
        const taskData = { ...req.body, userId: req.user.id };
        const task = await Task.create(taskData);
        const typedtask = taskTypeAddingMiddleware([task])[0];
        res.status(201).json(typedtask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Task', error: error.message });
    }
}

export const updateTask = async (req,res)=>{
    try {
        const [updatedRows] = await Task.update(req.body, { 
            where: { id: req.params.id, userId: req.user.id } 
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }
        const updatedTask = await Task.findOne({ 
            where: { id: req.params.id, userId: req.user.id } 
        });
        const typedtask = taskTypeAddingMiddleware([updatedTask])[0];
        res.status(200).json(typedtask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Task', error: error.message });
    }
}

export const deleteTask = async (req,res)=>{
    try {
        const deletedRows = await Task.destroy({ 
            where: { id: req.params.id, userId: req.user.id } 
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Task', error: error.message });
    }
}

export const patchTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id; // Dane z zalogowanego sesji/tokena

        console.log(`Próba wykonania zadania ID: ${id} przez User: ${userIdFromToken}`);

        const newStats = await processTaskCompletion(id, userIdFromToken);

        res.json({ 
            message: "Zadanie wykonane!", 
            newStats 
        });
    } catch (error) {
        return res.status(400).json({ message: 'Błąd podczas przetwarzania zadania', error: error.message });
    }
};