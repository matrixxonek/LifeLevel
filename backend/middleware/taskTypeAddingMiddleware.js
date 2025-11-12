export const typeAddingMiddleware = (taskt) => {
    try {
        const transformedTasks = tasks.map(task =>{
            const dataValue = task.toJSON();
            return{
                ...dataValue,
                type: 'task'
            };
        });
        return res.status(200).json(transformedTasks);
    } catch (error) {
        console.log('Błąd podczas dodawania typu do danych z bazy');
    }   
}