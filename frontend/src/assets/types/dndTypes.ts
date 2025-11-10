import type {Moment} from 'moment';
import type {CalendarItem} from './types.ts';
export type StringOrDate = string | Date;
export type DropResizeArgs = {
    event: CalendarItem; 
    start: StringOrDate | Moment;
    end: StringOrDate | Moment;
    isAllDay?: boolean; 
};