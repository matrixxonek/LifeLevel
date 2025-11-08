import type {EventInterface, EventApiInterface} from '../types/types.ts';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/events';
const newEvent: EventInterface = {
    name: "Sample Event",
    value: 100,
};

export const createEventHandler = async () => {
    try {
      const response: EventApiInterface = await axios.post(API_URL, newEvent);
      console.log(response.name)
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };