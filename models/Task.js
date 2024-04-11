import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.config.js';
import User from './User.js';

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        timestamps: false
    }
);

// Establishing association with User model
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Task;
