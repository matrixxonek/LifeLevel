import sequelize from "../config/db.js";
import Stats from "../models/statsModel.js";
import ExpHistory from "../models/exp_HistoryModel.js";
import { Op } from 'sequelize';

export const addExternalExp = async (req, res) => {
    const { userId, amount, category, reason, source, externalId } = req.body;
    const t = await sequelize.transaction();

    try {
        // 1. OCHRONA PRZED DUPLIKATAMI
        // Sprawdzamy czy ten konkretny commit/trening już został nagrodzony
        const alreadyProcessed = await ExpHistory.findOne({
            where: { source, externalId },
            transaction: t
        });

        if (alreadyProcessed) {
            await t.rollback();
            return res.status(200).json({ skipped: true, message: "Activity already processed" });
        }

        // 2. AKTUALIZACJA STATYSTYK
        const categoryField = `${category.toLowerCase()}Exp`; // np. mindExp
        const stats = await Stats.findOne({ where: { userId }, transaction: t });
        
        if (!stats) throw new Error("Stats not found for user");

        await stats.increment({ 
            [categoryField]: amount, 
            totalExp: amount 
        }, { transaction: t });

        // 3. DODANIE WPISU DO HISTORII
        const history = await ExpHistory.create({
            userId,
            amount,
            category,
            reason,
            source,      // 'GitHub' lub 'Strava'
            externalId   // Tu zapisujemy ID z API zewnętrznego
        }, { transaction: t });

        await t.commit();
        res.json({ success: true, newTotal: stats.totalExp + amount });

    } catch (error) {
        if (t) await t.rollback();
        console.error("External Exp Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};