const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');

class Log extends Model {}

Log.init(
  {
    idLogs: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  }
);

module.exports = Log;

Project.hasMany(Log, { foreignKey: 'projectId' });
Log.belongsTo(Project,{ foreignKey: 'projectId' });