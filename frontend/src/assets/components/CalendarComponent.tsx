import { useState, useCallback, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import type { CalendarItem, CreateItem } from '../types/types';
import type { DropResizeArgs} from '../types/dndTypes';
import { createItemHandler, updateItemHandler, getAllEventsHandler, getAllTasksHandler, deleteItemHandler } from '../services/apiService';
import Form from './Form';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<CalendarItem, moment.Moment>(Calendar);

const CalendarComponent = () => {
    const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<CalendarItem | null>(null);
    const [initialDates, setInitialDates] = useState<{ start: Date, end: Date } | null>(null);

    const convertItemDates = (item: CalendarItem): CalendarItem => ({
        ...item,
        start: item.start instanceof Date ? item.start : new Date(item.start),
        end: item.end instanceof Date ? item.end : new Date(item.end),
    });

    const convertArrayDates = (items: CalendarItem[]): CalendarItem[] => {
        return items.map(convertItemDates);
    };

    //#region Handlery API
    const onCreateItem = async(newItem: CreateItem)=>{
        try {
            const createdItem = await createItemHandler(newItem);
            setCalendarItems(prevItems => [...prevItems, createdItem])
        } catch (error) {
            console.error("Nie udało się utworzyć elementu:", error);
        }
    }
    const onUpdateItem = async(itemToEdit: CalendarItem)=>{
        try {
            const updatedItemApi = await updateItemHandler(itemToEdit);
            const updatedItem = {
                ...updatedItemApi,
                type: itemToEdit.type,
                start: new Date(updatedItemApi.start), 
                end: new Date(updatedItemApi.end),
            } as CalendarItem;
            setCalendarItems(prevItems => prevItems.map(item => 
                item.id === updatedItem.id ? updatedItem: item 
            ));
        } catch (error) {
            console.error("Nie udało się zaktualizować elementu:", error);
        }
    }
    const onDeleteItem = async(itemToDelete: CalendarItem)=>{
        try {
            await deleteItemHandler(itemToDelete); 
            setCalendarItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id)); 
        } catch (error) {
            console.error("Nie udało się usunąć elementu:", error);
        }
    }
    //#endregion
    //#region HandleRBCInteraction
    const handleSelectSlot = (slotInfo: { start: Date, end: Date })=>{
        setInitialDates({ start: slotInfo.start, end: slotInfo.end });
        setFormData(null);
        setIsFormOpen(true);
    }

    const handleSelectEvent = (event: CalendarItem)=>{
        setFormData(event);
        setInitialDates(null);
        setIsFormOpen(true);
    }

    const onCloseForm = ()=>{
        setIsFormOpen(false);
        setFormData(null);
        setInitialDates(null);
    }

    const handleItemDnd = useCallback(
        (item: DropResizeArgs) => {
            const newStart = moment.isMoment(item.start) ? item.start.toDate() : item.start;
            const newEnd = moment.isMoment(item.end) ? item.end.toDate() : item.end;

            const updatedItem = {
                ...item.event,
                start: newStart as Date,
                end: newEnd as Date,
            };
            onUpdateItem(updatedItem);
        },
        [onUpdateItem]
    );
    //#endregion
    //#region Wczytanie Danych
    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                console.log("Proba pobrania danych");
                const eventsPromise = getAllEventsHandler();
                const tasksPromise = getAllTasksHandler();
                const [events, tasks] = await Promise.all([eventsPromise, tasksPromise]);
                const allItems = [...events, ...tasks];
                const convertedAllItems = convertArrayDates(allItems);
                setCalendarItems(convertedAllItems);
            } catch (error) {
                console.error("Nie udało się załadować danych kalendarza:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);
    if (isLoading) {
        return <div>Ładowanie kalendarza...</div>;
    }
    //#endregion
    return (
        <div style={{ height: '700px' }}>
            <DnDCalendar
                localizer={localizer}
                events={calendarItems}
                onEventDrop={handleItemDnd}
                onEventResize={handleItemDnd}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                defaultView="month"
                startAccessor={(item: CalendarItem) => item.start}
                endAccessor={(item: CalendarItem) => item.end}
                style={{ height: 500 }}
                selectable={true}
            />
            {isFormOpen && <Form formData={formData} initialDates={initialDates} onCreate={onCreateItem} onUpdate={onUpdateItem} onDelete={onDeleteItem} onClose={onCloseForm}></Form>}
        </div>
    );
}

export default CalendarComponent;