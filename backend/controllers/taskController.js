import Task from '../models/taskModel.js';
import { taskTypeAddingMiddleware } from '../middleware/taskTypeAddingMiddleware.js';

export const getAllTasks = async (req, res)=>{
    try {
        const tasks = await Task.findAll();
        const typedTasks = taskTypeAddingMiddleware(tasks);
        res.status(200).json(typedTasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
}

export const getTask = async (req,res)=>{
    try {
        const task = await Task.findByPk(req.params.id);
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        const typedtask = typeAddingMiddleware(task);
        res.status(200).json(typedtask);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Task', error: error.message });
    }
}

export const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Task', error: error.message });
    }
}

export const updateTask = async (req,res)=>{
    try {
        const id = req.params.id;
        const task = await Task.update(req.body, { where: { id: req.params.id } });
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        const updatedTask = Task.findByPk(req.params.id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Task', error: error.message });
    }
}

export const deleteTask = async (req,res)=>{
    try {
        const task = await Task.destroy({ where: { id: req.params.id } });
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Task', error: error.message });
    }
}