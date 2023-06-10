const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');

class Logs extends Model {}

Logs.init(
  {
    idLogs: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    severity_level: {
      type: DataTypes.ENUM(
        'EMERGENCY',
        'ALERT',
        'CRITICAL',
        'ERROR',
        'WARNING',
        'NOTICE',
        'INFO',
        'DEBUG'
      ),
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'idProjects',
      },
    },
  },
  {
    sequelize,
    modelName: 'Logs',
    tableName: 'logs',
    timestamps: false,
  }
);

module.exports = Logs;
