import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const Stats = sequelize.define('Stats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true // Jeden rekord statystyk na jednego użytkownika
    },
    level: { type: DataTypes.INTEGER, defaultValue: 1 },
    totalExp: { type: DataTypes.INTEGER, defaultValue: 0 },
    mindExp: { type: DataTypes.INTEGER, defaultValue: 0 },
    physicalExp: { type: DataTypes.INTEGER, defaultValue: 0 },
    socialExp: { type: DataTypes.INTEGER, defaultValue: 0 },
    currentStreak: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'stats',
    timestamps: true
});

export default Stats;