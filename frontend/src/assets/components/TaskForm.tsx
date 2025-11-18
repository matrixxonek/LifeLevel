import React from 'react';
import type {CreateTask } from '../types/types';

type FieldName = keyof CreateTask;

interface TaskFieldsProps {
    data: CreateTask;
    onChange: (field: FieldName, value: any) => void;
}

const TaskFields: React.FC<TaskFieldsProps> = ({ data, onChange }) => {
    const statuses = ['To Do', 'In Progress', 'Done'];
    const priorities = ['Low', 'Medium', 'High'];
    const categories = ['Mind', 'Physical', 'Social'];

    return (
        <div className="task-fields">
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

            <label htmlFor="priority">Priorytet</label>
            <select
                id="priority"
                value={data.priority || 'Low'}
                onChange={(e) => onChange('priority', e.target.value)}
                required
            >
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <label htmlFor="status">Status</label>
            <select
                id="status"
                value={data.status || 'To Do'}
                onChange={(e) => onChange('status', e.target.value)}
                required
            >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            
            <label htmlFor="category">Kategoria</label>
            <select
                id="category"
                value={data.category || 'Mind'}
                onChange={(e) => onChange('category', e.target.value)}
                required
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            {/* UWAGA: Daty start/end są używane do wizualizacji deadline'u Taska
               i muszą być dostępne, jeśli użytkownik ma je zmieniać */}
        </div>
    );
};

export default TaskFields;