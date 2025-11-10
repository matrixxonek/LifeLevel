import type {CalendarItem, CreateItem, CreateEvent} from '../types/types.ts';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/events';
/*const newEvent: CreateEvent = {
    title: "Sample Event",
    start: new Date("2025-11-01T10:00:00"),
    end: new Date("2025-11-01T12:00:00"),
    description: "This is a sample event",
    isAllDay: false
};
*/
export const createEventHandler = async (newEvent: CreateEvent) => {
  const itemToSend: CreateItem = { type: 'event', data: newEvent };
  try {
    const response: CalendarItem = await axios.post(API_URL, itemToSend);
    console.log(response.title);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};