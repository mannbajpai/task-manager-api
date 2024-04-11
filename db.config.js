import { Sequelize } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD } from './config.env.js';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5, // maximum number of connections in the pool
        min: 0, // minimum number of connections in the pool
        acquire: 30000, // maximum time, in milliseconds, that pool will try to get the connection before throwing an error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
});

export default sequelize;
