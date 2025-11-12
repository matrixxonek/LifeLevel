import { warn } from "console";

export const stringToDateMiddleware = (req, res, next) => {
    dateFields = ['start', 'end'];

    if (req.body) {
        dataFields.forEach(element => {
            const dateString = req.body[element];
            if (dateString && typeof dateString === 'string') {
                const date = new Date(dateString);
                if (!isNaN(date.getTime())) {
                    req.body[element] = date;
                }else{
                    console.warn('Błąd konwersji danych wejściowych!');
                }
            }
        });
    }
    next();
};