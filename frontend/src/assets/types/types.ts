interface ItemBase {
  id: string;
  title: string;
  description: string;
  //cykliczność
}

interface CalendarEvent extends ItemBase {
    type: 'event';
    start: Date;
    end: Date;
    isAllDay?: boolean;
}
interface CalendarTask extends ItemBase {
    type: 'task';
    deadline: Date;
    status: 'To Do' | 'In Progress' | 'Done';
    category: 'Mind' | 'Physical' | 'Social';
    start: Date;
    end: Date;
}

export type CalendarItem = CalendarEvent | CalendarTask;

//Typy Wejściowe dla danych od użytkownika

type CreateEvent = Omit<CalendarEvent, 'id' | 'type'>;
type CreateTask = Omit<CalendarTask, 'id' | 'start' | 'end' | 'type'>;

export type CreateItem = { type: 'event', data: CreateEvent } | { type: 'task', data: CreateTask };