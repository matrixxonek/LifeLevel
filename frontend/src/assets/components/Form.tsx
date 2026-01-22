import {useEffect, useState} from 'react';
import type {CalendarItem, CreateEvent, CreateTask, CreateItem} from '../types/types.ts';
import EventForm from './EventForm.tsx';
import TaskForm from './TaskForm.tsx';
import moment from 'moment';
import { motion } from 'framer-motion';

interface FormProps {
    formData: CalendarItem | null;
    initialDates: {start: Date, end: Date} | null;
    onCreate: (data: CreateItem) => void; 
    onUpdate: (data: CalendarItem) => void;
    onDelete: (data: CalendarItem) => void; 
    onClose: () => void;
}

function Form(props: FormProps) {
  const isEditMode = !!props.formData;
  const [itemType, setItemType] = useState<'event' | 'task'>(props.formData?.type || 'event');
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [currentData, setCurrentData] = useState<CreateEvent | CreateTask | null>(null);
  const id = props.formData?.id;
  
  useEffect(() =>{
    if(isEditMode){
      console.log(props.formData?.type)
      setItemType(props.formData?.type || 'event')
      if(itemType == 'event'){
        const originalEvent: CalendarItem = props.formData as CalendarItem;
        const { id, type, ...dataToCreate } = originalEvent;
        const newCreateEventPayload: CreateEvent = dataToCreate;
        setCurrentData(newCreateEventPayload);
      }else if(itemType == 'task'){
        const originalTask: CalendarItem = props.formData as CalendarItem;
        const { id, type, ...dataToCreate } = originalTask;
        const newCreateEventPayload: CreateTask = dataToCreate as CreateTask;
        setCurrentData(newCreateEventPayload);
      }
    }else{
      const newEvent = {start: props.initialDates?.start, end: props.initialDates?.end, title: '',description: '',isAllDay: false} as CreateEvent;
      setCurrentData(newEvent);
      setItemType('event');
    }
  }, [props.formData, props.initialDates]);

  if (!currentData) {
      return <div>Ładowanie formularza...</div>;
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    if (!currentData) return; 
    setCurrentData(prev => ({
        ...(prev as any), 
        [fieldName]: value 
    } as CreateEvent | CreateTask));
};

  let ComponentToRender;
  if (itemType === 'event') {
      ComponentToRender = <EventForm data={currentData as CreateEvent} onChange={handleFieldChange}/>;
  } else if (itemType === 'task') {
      ComponentToRender = <TaskForm data={currentData as CreateTask} onChange={handleFieldChange}/>;
  } else {
      ComponentToRender = <div>Wybierz typ</div>;
  }

  const handleSave = async () => {
  if (isSubmiting) return;
  setIsSubmitting(true);
    if (!currentData || !currentData.title) return;
      try {
        const safeEndDate = (currentData as any).end || moment(currentData.start).add(1, 'hour').toDate();
        if (isEditMode) {
            const payload: CalendarItem = {
              id: id as string,
              type: itemType,
              ...(currentData as any),
              end: safeEndDate
            }
            await props.onUpdate(payload as CalendarItem); 
          } else {
            const payload: CreateItem = {
              type: itemType,
              data: {
                ...(currentData as any),
                end: safeEndDate 
              }
            };
            await props.onCreate(payload);
          }
          props.onClose();
          setIsSubmitting(false);
      } catch (e) {
          console.error("Błąd zapisu danych.", e);
      }
  };

  const handleDelete = async() =>{
    try {
      const payload: CalendarItem = {
        id: id as string,
        type: itemType,
        ...(currentData as any)
      }
      await props.onDelete(payload as CalendarItem); 
    } catch (error) {
      console.error("Błąd usunięcia danych.", error);
    }
    props.onClose()
  }

  const handleTypeChange = (newType: 'event' | 'task') => {
      if (newType === 'task') {
        console.log('Zmiana form na taska');
          const newDeadlineDate = (currentData as any)?.start || new Date();
          const defaultTask: CreateTask = {
              title: currentData.title,
              description: currentData.description,
              start: currentData.start,
              end: new Date(newDeadlineDate.getTime() + 30 * 60000),
              status: 'To Do', 
              priority: 'Low', 
              category: 'Mind',
          } as CreateTask;
          setCurrentData(defaultTask);
          setItemType('task');
      } else {
          console.log('Zmiana form na event');
          const defaultEvent: CreateEvent= {
              title: currentData.title,
              description: currentData.description,
              start: currentData.start,
              end: new Date(currentData.start.getTime() + 30 * 60000),
              isAllDay: false,
          } as CreateEvent;
          setCurrentData(defaultEvent);
          setItemType('event');
      }
  };

  return (
  <div 
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" 
    onClick={props.onClose}
  >
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg bg-[#1a1c2e]/95 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Dekoracyjna poświata wewnątrz modala */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none" />

      <h2 className="text-2xl font-bold text-[#FFE9D6] mb-6 tracking-tight">
        {isEditMode ? '📜 Edytuj Wpis' : '✨ Nowy Element'}
      </h2>

      {!isEditMode && (
        <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${itemType === 'event' ? 'bg-[#FFE9D6] text-[#3A3E5B]' : 'text-white/40 hover:text-white/70'}`}
            onClick={() => handleTypeChange('event')}
          >Wydarzenie</button>
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${itemType === 'task' ? 'bg-[#FFE9D6] text-[#3A3E5B]' : 'text-white/40 hover:text-white/70'}`}
            onClick={() => handleTypeChange('task')}
          >Zadanie</button>
        </div>
      )}

      <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {ComponentToRender}
      </div>

      <div className="flex gap-3 mt-8 justify-end border-t border-white/10 pt-6">
        <button 
          onClick={props.onClose} 
          className="px-6 py-2.5 rounded-xl text-white/50 hover:bg-white/5 transition-colors font-medium text-sm"
        >Anuluj</button>
        
        {isEditMode && (
          <button 
            onClick={handleDelete} 
            className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium text-sm"
          >Usuń</button>
        )}

        <button 
          onClick={handleSave} 
          className="px-8 py-2.5 rounded-xl bg-[#FFE9D6] text-[#3A3E5B] font-bold shadow-lg shadow-[#FFE9D6]/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
        >
          {isEditMode ? 'Zapisz' : 'Utwórz'}
        </button>
      </div>
    </motion.div>
  </div>
);
}
export default Form;