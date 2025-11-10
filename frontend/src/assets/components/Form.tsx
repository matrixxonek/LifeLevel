import React from 'react';
import type {CalendarItem, CreateItem} from '../types/types.ts';

interface FormProps {
    formData: CalendarItem | null;
    initialDates: {start: Date, end: Date} | null;
    onCreate: (data: CreateItem) => void; 
    onUpdate: (data: CalendarItem) => void;
    onDelete: (data: CalendarItem) => void; 
    onClose: () => void;
}

function Form(props: FormProps) {
  return <div>Form Component</div>;
}
export default Form;