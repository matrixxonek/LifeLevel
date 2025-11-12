import express from 'express';
import {getAllEvents, getEvent, createEvent, updateEvent, deleteEvent} from '../controllers/eventController.js';
import { stringToDateMiddleware } from '../middleware/stringToDateMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', getEvent);

router.post('/', stringToDateMiddleware, createEvent);

router.put('/:id', stringToDateMiddleware, updateEvent);

router.delete('/:id', deleteEvent);

// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera eventow.');
    next();
});

export default router;