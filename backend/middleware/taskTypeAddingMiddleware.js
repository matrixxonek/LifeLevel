export const taskTypeAddingMiddleware = (tasks) => {
    try {
        if (!Array.isArray(tasks)) return []; 
        return tasks.map(task => {
            const dataValue = task.toJSON();
            console.log('Przetwarzany task:', dataValue);
            return {
                ...dataValue,
                type: 'task'
            };
        });
    } catch (error) {
        console.error('Błąd podczas transformacji Tasków:', error);
        throw error;
    } 
}