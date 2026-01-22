import sequelize from "../config/db.js";
import Task from "../models/taskModel.js";
import Stats from "../models/statsModel.js";
import ExpHistory from "../models/exp_HistoryModel.js";

// backend/services/rpgService.js

export const processTaskCompletion = async (taskId, userId) => {
    console.log("DEBUG BACKEND userId:", userId);
    const t = await sequelize.transaction();

    try {
        const task = await Task.findOne({ 
            where: { id: taskId, userId }, 
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!task) throw new Error("Zadanie nie istnieje");
        if (task.status === 'Done') throw new Error("Zadanie już wykonane");

        // 1. Zabezpieczenie kategorii (mapowanie)
        const validCategories = ['Mind', 'Physical', 'Social'];
        const category = validCategories.includes(task.category) ? task.category : 'Mind'; 
        const categoryField = `${category.toLowerCase()}Exp`; // np. mindExp

        // 2. Zabezpieczenie XP (upewnij się, że to liczby)
        const priorityXP = {
            'High': 50,
            'Medium': 25,
            'Low': 10
        };
        const xpAmount = priorityXP[task.priority] || 10;

        // LOG DLA DEBUGOWANIA (zobacz to w konsoli serwera)
        console.log(`Dodaję ${xpAmount} XP do kolumny ${categoryField} dla user ${userId}`);

        // 3. Aktualizacja zadania
        task.status = 'Done';
        await task.save({ transaction: t });

        // 4. Aktualizacja Stats
        const stats = await Stats.findOne({ where: { userId }, transaction: t });
        
        // Używamy metody increment w bezpieczny sposób
        await stats.increment({ 
            [categoryField]: xpAmount, 
            totalExp: xpAmount 
        }, { transaction: t });

        // 5. Log historii
        await ExpHistory.create({
            userId,
            amount: xpAmount,
            category: category,
            reason: `Ukończenie: ${task.title}`
        }, { transaction: t });

        await t.commit();
        
        // Zwracamy przeładowane statystyki
        return await stats.reload();
        
    } catch (error) {
        if (t) await t.rollback();
        console.error("SERVICE ERROR:", error.message);
        throw error;
    }
};