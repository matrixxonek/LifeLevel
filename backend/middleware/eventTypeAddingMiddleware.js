export const typeAddingMiddleware = (events) => {
    try {
        const transformedEvents = events.map(event =>{
            const dataValue = event.toJSON();
            return{
                ...dataValue,
                type: 'event'
            };
        });
        return res.status(200).json(transformedEvents);
    } catch (error) {
        console.log('Błąd podczas dodawania typu do danych z bazy');
    }   
}