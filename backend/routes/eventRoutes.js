import express from 'express';
import {getAllEvents, getEvent, createEvent, updateEvent, deleteEvent} from '../controllers/eventController.js';
import { stringToDateMiddleware } from '../middleware/stringToDateMiddleware.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';

const router = express.Router();

router.get('/', authTokenMiddleware, getAllEvents);
router.get('/:id', authTokenMiddleware, getEvent);

router.post('/', authTokenMiddleware, stringToDateMiddleware, createEvent);

router.put('/:id', authTokenMiddleware, stringToDateMiddleware, updateEvent);

router.delete('/:id', authTokenMiddleware, deleteEvent);
// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera eventow.');
    next();
});

export default router;