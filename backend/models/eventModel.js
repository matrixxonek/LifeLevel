import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
},{
    tableName: 'events',
    timestamps: false
});
export default Event;