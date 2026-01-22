import { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, type View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarItem } from '../types/types';
import type { DropResizeArgs } from '../types/dndTypes';
import Form from './Form';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<CalendarItem, any>(Calendar);

const CalendarComponent = ({ variant = 'full' }: { variant?: 'mini' | 'full' }) => {
  const { items, loading, actions } = useCalendar();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<CalendarItem | null>(null);
  const [initialDates, setInitialDates] = useState<{ start: Date, end: Date } | null>(null);

  const [view, setView] = useState<View>(variant === 'mini' ? 'week' as View : 'month' as View);
  const [date, setDate] = useState(new Date());

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), []);
  const onView = useCallback((newView: View) => setView(newView), []);

  const handleSelectSlot = useCallback((slotInfo: { start: Date, end: Date }) => {
    if (variant === 'mini') return;
    setInitialDates({ start: slotInfo.start, end: slotInfo.end });
    setFormData(null);
    setIsFormOpen(true);
  }, [variant]);

  const handleSelectEvent = useCallback((event: CalendarItem) => {
    setFormData(event);
    setInitialDates(null);
    setIsFormOpen(true);
  }, []);

  const handleItemDnd = useCallback((args: DropResizeArgs) => {
    const { event, start, end } = args;
    actions.updateItem({
      ...event,
      start: moment(start).toDate(),
      end: moment(end).toDate(),
    });
  }, [actions]);

  const eventPropGetter = (event: CalendarItem) => {
    const isTask = 'category' in event;
    let color = '#3b82f6'; // default Mind
    if (isTask) {
      if (event.category === 'Physical') color = '#10b981';
      if (event.category === 'Social') color = '#ec4899';
    }
    return {
      style: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '8px',
        fontSize: '11px',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }
    };
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${variant === 'mini' ? 'h-100 bg-white/5 p-4 border border-white/10' : 'h-full bg-transparent'}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212]/60 z-50 backdrop-blur-md">
          <p className="text-[#FFE9D6] animate-pulse uppercase tracking-widest text-xs">Synchronizacja czasu...</p>
        </div>
      )}

      <DnDCalendar
        localizer={localizer}
        events={items}
        view={view}
        date={date}
        onView={onView}
        onNavigate={onNavigate}
        allDayAccessor={(event: any) => event.isAllDay}
        
        defaultView={variant === 'mini' ? Views.WEEK : Views.MONTH}
        views={variant === 'mini' ? [Views.WEEK] : [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        toolbar={variant !== 'mini'}
        
        onEventDrop={handleItemDnd}
        onEventResize={handleItemDnd}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable={variant !== 'mini'}
        eventPropGetter={eventPropGetter}
        
        className="rpg-calendar"
        style={{ height: '100%' }}
      />

      <style>{`
        /* Nadpisujemy domyślne style React Big Calendar */
        .rpg-calendar { border: none !important; color: #fff !important; }
        .rbc-header { 
          padding: 12px !important; 
          text-transform: uppercase; 
          font-size: 10px; 
          letter-spacing: 0.1em; 
          color: rgba(255,255,255,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .rbc-month-view, .rbc-time-view { 
          background: transparent !important; 
          border: 1px solid rgba(255,255,255,0.05) !important;
          border-radius: 20px;
        }
        .rbc-day-bg + .rbc-day-bg, .rbc-month-row + .rbc-month-row {
          border-left: 1px solid rgba(255,255,255,0.05) !important;
          border-top: 1px solid rgba(255,255,255,0.05) !important;
        }
        .rbc-today { background-color: rgba(255,233,214,0.03) !important; }
        .rbc-off-range-bg { background-color: transparent !important; opacity: 0.2; }
        .rbc-toolbar button {
          color: rgba(255,255,255,0.6) !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          margin: 0 2px !important;
          font-size: 11px !important;
          text-transform: uppercase;
        }
        .rbc-toolbar button.rbc-active {
          background: rgba(59, 130, 246, 0.5) !important;
          color: white !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }
        .rbc-event { padding: 4px 8px !important; }
      `}</style>

      {isFormOpen && variant !== 'mini' && (
        <Form 
          formData={formData} 
          initialDates={initialDates} 
          onCreate={actions.addItem} 
          onUpdate={actions.updateItem} 
          onDelete={actions.removeItem} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default CalendarComponent;