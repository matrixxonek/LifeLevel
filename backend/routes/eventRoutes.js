import express from 'express';
import {getAllEvents, getEvent, createEvent, updateEvent, deleteEvent} from '../controllers/eventController';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', getEvent);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

// Middleware: Loguj requesty do tego routera

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera eventow.');
    next();
});

module.export = router;