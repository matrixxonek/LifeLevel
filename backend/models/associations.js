import User from "./userModel.js";
import ExpHistory from "./exp_HistoryModel.js";
import Stats from "./statsModel.js";
import Task from "./taskModel.js";
import Event from "./eventModel.js";

const setupAssociations = () => {
    // User - Stats (1:1)
    User.hasOne(Stats, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Stats.belongsTo(User, { foreignKey: 'userId' });

    //User - ExpHistory (1:N)
    User.hasMany(ExpHistory, { foreignKey: 'userId', onDelete: 'CASCADE' });
    ExpHistory.belongsTo(User, { foreignKey: 'userId' });
    
    // User - Task (1:N)
    User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Task.belongsTo(User, { foreignKey: 'userId' });

    // User - Event (1:N)
    User.hasMany(Event, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Event.belongsTo(User, { foreignKey: 'userId' });
};

export default setupAssociations;