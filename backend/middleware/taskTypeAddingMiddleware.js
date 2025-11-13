export const taskTypeAddingMiddleware = (tasks) => {
    try {
        if (!Array.isArray(tasks)) return [];
        return tasks.map(task =>{
            const dataValue = task.toJSON();
            return{
                ...dataValue,
                type: 'task'
            };
        });
    } catch (error) {
        console.error('Błąd podczas dodawania typu Event:', error);
        throw new Error('Failed to transform event data.');
    } 
}