import React from 'react';
import type {CreateEvent } from '../types/types';

type FieldName = keyof CreateEvent;

interface EventFieldsProps {
    data: CreateEvent;
    onChange: (field: FieldName, value: any) => void;
}

const EventFields: React.FC<EventFieldsProps> = ({ data, onChange }) => {
    const handleDateTimeChange = (field: 'start' | 'end', dateString: string) => {
        const date = new Date(dateString);
        onChange(field, date);
    };

    return (
        <div className="event-fields flex flex-col gap-4 [&>*]:ring-1 [&>*]:ring-gray-300 [&>*]:rounded-md [&>*]:p-2">
            <label htmlFor="title">Tytuł</label>
            <input 
                id="title" 
                type="text" 
                value={data.title || ''}
                onChange={(e) => onChange('title', e.target.value)}
                required
            />
            
            <label htmlFor="description">Opis</label>
            <textarea 
                id="description" 
                value={data.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
            />
            <label htmlFor="start">Start</label>
            <input
                id="start"
                type="datetime-local"
                value={data.start instanceof Date ? data.start.toISOString().slice(0, 16) : ''}
                onChange={(e) => handleDateTimeChange('start', e.target.value)}
                required
            />

            <label htmlFor="end">Koniec</label>
            <input
                id="end"
                type="datetime-local"
                value={data.end instanceof Date ? data.end.toISOString().slice(0, 16) : ''}
                onChange={(e) => handleDateTimeChange('end', e.target.value)}
                required
            />
            
            <label htmlFor="isAllDay">Cały dzień?</label>
            <input 
                id="isAllDay"
                type="checkbox" 
                checked={!!data.isAllDay}
                onChange={(e) => onChange('isAllDay', e.target.checked)}
            />
        </div>
    );
};

export default EventFields;