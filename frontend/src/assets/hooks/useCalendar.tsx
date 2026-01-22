import { useState, useCallback, useEffect } from 'react';
import { 
  getAllEventsHandler, 
  getAllTasksHandler, 
  createItemHandler, 
  updateItemHandler, 
  deleteItemHandler 
} from '../services/apiService';
import type { CalendarItem, CreateItem } from '../types/types';

export const useCalendar = () => {
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Funkcja pomocnicza do konwersji dat (odciążamy komponent)
  const formatItems = useCallback((data: CalendarItem[]): CalendarItem[] => {
    return data.map(item => ({
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
    }));
  }, []);

  // 1. Pobieranie danych
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [events, tasks] = await Promise.all([
        getAllEventsHandler(),
        getAllTasksHandler()
      ]);
      const combined = [...events, ...tasks];
      setItems(formatItems(combined));
    } catch (error) {
      console.error("Błąd podczas wczytywania ksiąg:", error);
    } finally {
      setLoading(false);
    }
  }, [formatItems]);

  // Inicjalne ładowanie
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // 2. Dodawanie elementu
  const addItem = async (newItem: CreateItem) => {
    try {
      const created = await createItemHandler(newItem);
      const formatted = { ...created, start: new Date(created.start), end: new Date(created.end) };
      setItems(prev => [...prev, formatted]);
      return formatted;
    } catch (error) {
      console.error("Nie udało się dopisać do dziennika:", error);
      throw error;
    }
  };

  // 3. Aktualizacja elementu
  const updateItem = async (itemToUpdate: CalendarItem) => {
    try {
      const updatedApi = await updateItemHandler(itemToUpdate);
      const formatted = { 
        ...updatedApi, 
        type: itemToUpdate.type, // Zachowujemy typ, jeśli API go nie zwraca
        start: new Date(updatedApi.start), 
        end: new Date(updatedApi.end) 
      } as CalendarItem;
      
      setItems(prev => prev.map(item => item.id === formatted.id ? formatted : item));
    } catch (error) {
      console.error("Błąd podczas rzucania zaklęcia aktualizacji:", error);
      throw error;
    }
  };

  // 4. Usuwanie elementu
  const removeItem = async (item: CalendarItem) => {
    try {
      await deleteItemHandler(item);
      setItems(prev => prev.filter(i => i.id !== item.id));
    } catch (error) {
      console.error("Nie udało się wymazać wpisu:", error);
      throw error;
    }
  };

  return {
    items,
    loading,
    refresh: fetchAllData,
    actions: {
      addItem,
      updateItem,
      removeItem
    }
  };
};