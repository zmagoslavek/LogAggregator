const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Project extends Model {}

Project.init(
  {
    idProjects: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'idUsers',
      },
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: false,
  }
);

Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;