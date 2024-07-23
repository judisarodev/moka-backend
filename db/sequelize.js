const { Sequelize } = require('sequelize'); 
const setUpModels = require('./models/index');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mariadb'
    }
);

setUpModels(sequelize);
module.exports = sequelize;