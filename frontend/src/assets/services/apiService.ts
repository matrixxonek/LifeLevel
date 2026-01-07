import type {CalendarItem, CreateItem} from '../types/types.ts';
import axios from 'axios';
import api from '../api/axios.ts';

export const createItemHandler = async (newItem: CreateItem) : Promise<CalendarItem>=> {
  try {
    const endpoint = newItem.type === 'event'?'events':'tasks';

    const response = await api.post<CalendarItem>(endpoint, newItem.data);
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
    const endpoint = itemToEdit.type === 'event'?'events':'tasks'.concat('/').concat(itemToEdit.id);
    const response = await api.put<CalendarItem>(endpoint, itemToEdit);
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
    const response = await api.get<CalendarItem[]>("events");
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
    console.log('dziala w apiservice');
    const response = await api.get<CalendarItem[]>("tasks");
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
    const endpoint = itemToDelete.type === 'event'?'events':'tasks'.concat('/').concat(itemToDelete.id);
    await api.delete(endpoint);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Element o ID ${itemToDelete.id} nie został znaleziony.`);
        throw new Error('NOT_FOUND');
      }
      throw error;
  }
}