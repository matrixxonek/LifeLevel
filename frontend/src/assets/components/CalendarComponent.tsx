import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import type { CalendarItem } from '../types/types';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<CalendarItem, moment.Moment>(Calendar);

const CalendarComponent = () => {
    const [myCalendarItems, setMyCalendarItems] = useState<CalendarItem[]>([]);
    const [isFormOpen, setIsFormOpern] = useState<boolean>(false);

    const onEventDrop = ()=>{

    }
    const onEventResize = ()=>{
        
    }

    return (
        <div style={{ height: '700px' }}>
            <DnDCalendar
                localizer={localizer}
                events={myCalendarItems}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                defaultView="month"
                startAccessor={(item: CalendarItem) => item.start}
                endAccessor={(item: CalendarItem) => item.end}
                style={{ height: 500 }}
            />
        </div>
    );
}

export default CalendarComponent;