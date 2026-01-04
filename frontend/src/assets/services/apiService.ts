import type {CalendarItem, CreateItem} from '../types/types.ts';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:3000/api/';

export const createItemHandler = async (newItem: CreateItem) : Promise<CalendarItem>=> {
  try {
    const API_URL = BASE_API_URL.concat(newItem.type === 'event'?'events':'tasks');
    
    const response = await axios.post<CalendarItem>(API_URL, newItem.data);
    return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Błąd API podczas tworzenia:", error.response?.data || error.message);
      } else {
        console.error("Nieznany błąd:", error);
      }
      throw error;
  }
};

export const updateItemHandler = async(itemToEdit: CalendarItem) : Promise<CalendarItem> =>{
  try {
    console.log('Moj item ktory updateuje: ' +itemToEdit +' a to jego typ: ' + itemToEdit.type);
    const API_URL = BASE_API_URL.concat(itemToEdit.type === 'event'?'events':'tasks').concat('/').concat(itemToEdit.id);
    const response = await axios.put<CalendarItem>(API_URL, itemToEdit);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd API podczas aktualizowania:", error.response?.data || error.message);
      } else {
        console.error("Nieznany błąd:", error);
      }
      throw error;
  }
}

export const getAllEventsHandler = async() : Promise<CalendarItem[]> =>{
  try {
    const API_URL = BASE_API_URL.concat('events');
    const response = await axios.get<CalendarItem[]>(API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd API podczas pobierania:", error.response?.data || error.message);
      } else {
        console.error("Nieznany błąd:", error);
      }
      throw error;
  }
}

export const getAllTasksHandler = async() : Promise<CalendarItem[]> =>{
  try {
    const API_URL = BASE_API_URL.concat('tasks');
    console.log('dziala w apiservice');
    const response = await axios.get<CalendarItem[]>(API_URL);
    console.log('dziala w apiservice po odpowiedzi');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd API podczas pobierania:", error.response?.data || error.message);
      } else {
        console.error("Nieznany błąd:", error);
      }
      throw error;
  }
}

export const deleteItemHandler = async(itemToDelete: CalendarItem) =>{
  try {
    const API_URL = BASE_API_URL.concat(itemToDelete.type === 'event'?'events':'tasks').concat('/').concat(itemToDelete.id);
    await axios.delete(API_URL);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Element o ID ${itemToDelete.id} nie został znaleziony.`);
        throw new Error('NOT_FOUND');
      }
      throw error;
  }
}