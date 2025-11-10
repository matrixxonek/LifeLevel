import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isAllDay: {
        type:DataTypes.BOOLEAN,
        allowNull: false,
    }
},{
    tableName: 'events',
    timestamps: true
});
export default Event;