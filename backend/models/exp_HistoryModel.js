import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const ExpHistory = sequelize.define('ExpHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Mind', 'Physical', 'Social'),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false // np. "Completed Task: Morning Run"
    }
}, {
    tableName: 'exp_history',
    timestamps: true, // Automatycznie doda createdAt, czyli datę zdobycia XP
    updatedAt: false // Historia jest tylko do odczytu/zapisu, nie edytujemy jej
});

export default ExpHistory;