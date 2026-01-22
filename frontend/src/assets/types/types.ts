interface ItemBase {
  id: string;
  title: string;
  description: string;
  //cykliczność
  userId: string;
}

interface CalendarEvent extends ItemBase {
    type: 'event';
    start: Date;
    end: Date;
    isAllDay?: boolean;
}
export interface CalendarTask extends ItemBase {
    type: 'task';
    start: Date;
    end: Date;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    category: 'Mind' | 'Physical' | 'Social';
}

export type CalendarItem = CalendarEvent | CalendarTask;

//Typy Wejściowe dla danych od użytkownika

export type CreateEvent = Omit<CalendarEvent, 'id' | 'type' | 'userId'>;
export type CreateTask = Omit<CalendarTask, 'id' | 'type' | 'userId'>;

export type CreateItem = { type: 'event', data: CreateEvent } | { type: 'task', data: CreateTask };