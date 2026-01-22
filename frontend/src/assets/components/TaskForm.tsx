import React from 'react';
import type {CreateTask } from '../types/types';

type FieldName = keyof CreateTask;

interface TaskFieldsProps {
    data: CreateTask;
    onChange: (field: FieldName, value: any) => void;
}

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFE9D6]/50 transition-all text-sm appearance-none cursor-pointer";
const labelClasses = "block text-[10px] uppercase tracking-[0.15em] text-[#FFE9D6]/50 mb-1.5 ml-1 font-semibold";

const TaskFields: React.FC<TaskFieldsProps> = ({ data, onChange }) => {
    const statuses = ['To Do', 'In Progress', 'Done'];
    const priorities = ['Low', 'Medium', 'High'];
    const categories = ['Mind', 'Physical', 'Social'];

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Tytuł */}
            <div>
                <label className={labelClasses}>Zlecenie</label>
                <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Co należy uczynić?"
                    value={data.title || ''}
                    onChange={(e) => onChange('title', e.target.value)}
                    required
                />
            </div>

            {/* Kategoria i Priorytet w jednym rzędzie */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Ścieżka (Kategoria)</label>
                    <select
                        className={inputClasses}
                        value={data.category || 'Mind'}
                        onChange={(e) => onChange('category', e.target.value)}
                        required
                    >
                        {categories.map(c => <option key={c} value={c} className="bg-[#1a1c2e]">{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClasses}>Waga (Priorytet)</label>
                    <select
                        className={inputClasses}
                        value={data.priority || 'Low'}
                        onChange={(e) => onChange('priority', e.target.value)}
                        required
                    >
                        {priorities.map(p => <option key={p} value={p} className="bg-[#1a1c2e]">{p}</option>)}
                    </select>
                </div>
            </div>

            {/* Deadline i Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Termin (Deadline)</label>
                    <input
                        type="datetime-local"
                        className={inputClasses}
                        value={data.start instanceof Date ? data.start.toISOString().slice(0, 16) : ''}
                        onChange={(e) => onChange('start', new Date(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label className={labelClasses}>Stan Realizacji</label>
                    <select
                        className={inputClasses}
                        value={data.status || 'To Do'}
                        onChange={(e) => onChange('status', e.target.value)}
                        required
                    >
                        {statuses.map(s => <option key={s} value={s} className="bg-[#1a1c2e]">{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Opis */}
            <div>
                <label className={labelClasses}>Szczegóły Misji</label>
                <textarea 
                    className={`${inputClasses} min-h-15 resize-none`}
                    placeholder="Opisz kroki do celu..."
                    value={data.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                />
            </div>
        </div>
    );
};

export default TaskFields;