import Event from '../models/eventModel.js';

export const getAllEvents = async (req, res)=>{
    try {
        const events = Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving eventss', error: error.message });
    }
}

export const getEvent = async (req,res)=>{
    try {
        const event = Event.findByPk(req.params.id);
        if(!event){
            res.status(404).json({message: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error: error.message });
    }
}

export const createEvent = async (req,res)=>{
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
}

export const updateEvent = async (req,res)=>{
    try {
        const event = await Event.update(req.params.id, req.body);
        if(!event){
            res.status(404).json({message: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
}

export const deleteEvent = async (req,res)=>{
    try {
        const event = await Event.destroy(req.params.id);
        if(!event){
            res.status(404).json({message: 'Event not found'});
        }
        res.status(200).json({message: 'Event deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
}