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
        type: DataTypes.STRING, // Zmienione z ENUM dla większej elastyczności API
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // --- NOWE POLA ---
    source: {
        type: DataTypes.STRING,
        defaultValue: 'Manual' // 'GitHub', 'Strava' lub 'Manual'
    },
    externalId: {
        type: DataTypes.STRING,
        allowNull: true // Tu będzie ID pusha/treningu
    }
}, {
    tableName: 'exp_history',
    timestamps: true,
    updatedAt: false
});

export default ExpHistory;