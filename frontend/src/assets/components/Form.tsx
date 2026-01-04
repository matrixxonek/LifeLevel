import {useEffect, useState} from 'react';
import type {CalendarItem, CreateEvent, CreateTask, CreateItem} from '../types/types.ts';
import EventForm from './EventForm.tsx';
import TaskForm from './TaskForm.tsx';

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
        const { id, type, end, ...dataToCreate } = originalTask;
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
    if (!currentData || !currentData.title) return;
      try {
        if (isEditMode) {
            const payload: CalendarItem = {
              id: id as string,
              type: itemType,
              ...(currentData as any)
            }
            await props.onUpdate(payload as CalendarItem); 
          } else {
            const payload: CreateItem = {
              type: itemType,
              data: currentData as any 
            };
            await props.onCreate(payload);
          }
          props.onClose();
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
              isAllDay: false,
          } as CreateEvent;
          setCurrentData(defaultEvent);
          setItemType('event');
      }
  };

  return (
    <div className="modal-backdrop" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>      
          <h2>{isEditMode ? 'Edytuj Element' : 'Nowy Element'}</h2>
            {!isEditMode && (
              <div className="type-toggle">
                <button 
                  onClick={() => handleTypeChange('event')} 
                  disabled={itemType === 'event'}
                >Event</button>
                <button 
                  onClick={() => handleTypeChange('task')}
                  disabled={itemType === 'task'}
                >Task</button>
              </div>
            )}
            {ComponentToRender}
            <div className="actions">
              <button onClick={handleSave} className="save-btn">
                {isEditMode ? 'Zapisz Zmiany' : 'Utwórz'}
              </button>
                {isEditMode && (
                  <button onClick={handleDelete} className="delete-btn">
                    Usuń
                  </button>
                )}
                <button onClick={props.onClose} className="cancel-btn">
                  Anuluj
                </button>
            </div>
      </div>
    </div>
);
}
export default Form;