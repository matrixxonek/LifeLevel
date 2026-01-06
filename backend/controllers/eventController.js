import Event from '../models/eventModel.js';
import { eventTypeAddingMiddleware } from '../middleware/eventTypeAddingMiddleware.js';

export const getAllEvents = async (req, res) => {
    try {
        // Pobieramy eventy tylko dla zalogowanego użytkownika
        const events = await Event.findAll({
            where: { userId: req.user.id }
        });
        const typedEvents = eventTypeAddingMiddleware(events);
        res.status(200).json(typedEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
}

export const getEvent = async (req, res) => {
    try {
        // Szukamy eventu po ID, ale upewniamy się, że należy do użytkownika
        const event = await Event.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        const typedEvent = eventTypeAddingMiddleware([event])[0];
        res.status(200).json(typedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error: error.message });
    }
}

export const createEvent = async (req, res) => {
    try {
        // Łączymy dane z frontu z ID użytkownika z tokena
        const eventData = { ...req.body, userId: req.user.id };
        const event = await Event.create(eventData);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        // Aktualizujemy tylko jeśli ID i właściciel się zgadzają
        const [updatedRows] = await Event.update(req.body, { 
            where: { id: id, userId: req.user.id } 
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        const updatedEvent = await Event.findOne({ where: { id, userId: req.user.id } });
        const typedEvent = eventTypeAddingMiddleware([updatedEvent])[0];
        return res.status(200).json(typedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        // Usuwamy tylko własny event
        const deletedRows = await Event.destroy({ 
            where: { id: req.params.id, userId: req.user.id } 
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
}