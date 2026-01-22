import React from 'react';
import type {CreateEvent } from '../types/types';

type FieldName = keyof CreateEvent;

interface EventFieldsProps {
    data: CreateEvent;
    onChange: (field: FieldName, value: any) => void;
}

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFE9D6]/50 focus:ring-1 focus:ring-[#FFE9D6]/50 transition-all text-sm";
const labelClasses = "block text-[10px] uppercase tracking-[0.15em] text-[#FFE9D6]/50 mb-1.5 ml-1 font-semibold";

const EventFields: React.FC<EventFieldsProps> = ({ data, onChange }) => {
    const handleDateTimeChange = (field: 'start' | 'end', dateString: string) => {
        const date = new Date(dateString);
        onChange(field, date);
    };

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Tytuł */}
            <div>
                <label className={labelClasses} htmlFor="title">Nazwa Wpisu</label>
                <input 
                    id="title" 
                    type="text" 
                    className={inputClasses}
                    placeholder="np. Rytuał Skupienia"
                    value={data.title || ''}
                    onChange={(e) => onChange('title', e.target.value)}
                    required
                />
            </div>

            {/* Czas Trwania - Grid dla oszczędności miejsca */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses} htmlFor="start">Początek</label>
                    <input
                        id="start"
                        type="datetime-local"
                        className={inputClasses}
                        value={data.start instanceof Date ? data.start.toISOString().slice(0, 16) : ''}
                        onChange={(e) => handleDateTimeChange('start', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={labelClasses} htmlFor="end">Koniec</label>
                    <input
                        id="end"
                        type="datetime-local"
                        className={inputClasses}
                        value={data.end instanceof Date ? data.end.toISOString().slice(0, 16) : ''}
                        onChange={(e) => handleDateTimeChange('end', e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Opis */}
            <div>
                <label className={labelClasses} htmlFor="description">Notatki Adepta</label>
                <textarea 
                    id="description" 
                    className={`${inputClasses} min-h-20 resize-none`}
                    placeholder="Dodaj szczegóły misji..."
                    value={data.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                />
            </div>
            
            {/* Cały dzień */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <input 
                    id="isAllDay"
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#FFE9D6] focus:ring-[#FFE9D6]/50"
                    checked={!!data.isAllDay}
                    onChange={(e) => onChange('isAllDay', e.target.checked)}
                />
                <label htmlFor="isAllDay" className="text-xs text-white/70 cursor-pointer select-none">
                    Wydarzenie całodniowe
                </label>
            </div>
        </div>
    );
};

export default EventFields;