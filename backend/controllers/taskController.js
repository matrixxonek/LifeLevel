import { error } from 'console';
import TaskModel from '../models/taskModel.js';
import { get } from 'http';

export const getAllTasks = async (req, res)=>{
    try {
        const tasks = TaskModel.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
}

export const getTask = async (req,res)=>{
    try {
        const task = TaskModel.find(req.params.id);
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Task', error: error.message });
    }
}

export const createTask = async (req,res)=>{
    try {
        const task = await TaskModel.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Task', error: error.message });
    }
}

export const updateTask = async (req,res)=>{
    try {
        const task = await TaskModel.update(req.params.id, req.body);
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Task', error: error.message });
    }
}

export const deleteTask = async (req,res)=>{
    try {
        const task = await TaskModel.delete(req.params.id);
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Task', error: error.message });
    }
}