import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const Task = sequelize.define('Task', {
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
        field: 'start_date',
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'end_date',
    },
    status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('Mind', 'Physical', 'Social'),
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
    }
},{
    tableName: 'tasks',
    timestamps: true
});
export default Task;