import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import type { CalendarTask } from '../types/types';
import { useAuth } from '../context/authContext';
import { getAllTasksHandler, completeTaskHandler } from '../services/apiService';

interface TaskListProps {
  variant?: 'mini' | 'full';
  categoryFilter?: CalendarTask['category']; // Opcjonalnie do filtrowania na pełnej stronie
}

export const TaskList: React.FC<TaskListProps> = ({ variant = 'full', categoryFilter }) => {
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const { updateStats } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allItems = await getAllTasksHandler();
        let filteredTasks = (allItems as CalendarTask[]).filter(t => t.status !== 'Done');

        // Filtr kategorii (przydatny w wersji 'full')
        if (categoryFilter) {
          filteredTasks = filteredTasks.filter(t => t.category === categoryFilter);
        }

        // Sortowanie po priorytecie
        filteredTasks.sort((a, b) => {
          const pMap = { High: 3, Medium: 2, Low: 1 };
          return pMap[b.priority] - pMap[a.priority];
        });

        // Jeśli to mini, bierzemy tylko 5
        if (variant === 'mini') {
          filteredTasks = filteredTasks.slice(0, 5);
        }

        setTasks(filteredTasks);
      } catch (err) {
        console.error("Task fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [variant, categoryFilter]);

  const handleComplete = async (id: string) => {
    try {
      const result = await completeTaskHandler(id);
      updateStats(result.newStats);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  if (isLoading) return <div className="p-4 text-center text-white/20 text-xs">Wczytywanie zwojów...</div>;

  return (
    <div className={`flex flex-col ${variant === 'mini' ? 'gap-2' : 'gap-4 p-4'}`}>
      <AnimatePresence mode="popLayout">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onComplete={handleComplete} 
              isMini={variant === 'mini'} 
            />
          ))
        ) : (
          <div className="py-10 text-center opacity-40 italic text-[10px] tracking-widest text-[#FFE9D6]">
            {variant === 'mini' ? 'Wszystkie zlecenia wykonane' : 'Dziennik zadań jest pusty'}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};