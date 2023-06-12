const { Sequelize } = require('sequelize');
const config = require('./config.json')

// Define the database connection details
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host:config.development.host,
  port: config.development.port,
  dialect: config.development.dialect,
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;