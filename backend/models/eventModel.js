import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
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
        field: 'start_date',
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'end_date',
    },
    isAllDay: {
        type:DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_all_day',
    }
},{
    tableName: 'events',
    timestamps: true
});
export default Event;