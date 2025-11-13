export const eventTypeAddingMiddleware = (events) => {
    try {
        if (!Array.isArray(events)) return [];
        return events.map(event =>{
            const dataValue = event.toJSON();
            return{
                ...dataValue,
                type: 'event'
            };
        });
    } catch (error) {
        console.error('Błąd podczas dodawania typu Event:', error);
        throw new Error('Failed to transform event data.');
    }
}