'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teams.init({
    team: DataTypes.STRING,
    week1: DataTypes.BOOLEAN,
    week2: DataTypes.BOOLEAN,
    week3: DataTypes.BOOLEAN,
    week4: DataTypes.STRING,
    week5: DataTypes.BOOLEAN,
    week6: DataTypes.BOOLEAN,
    week7: DataTypes.BOOLEAN,
    week8: DataTypes.BOOLEAN,
    week9: DataTypes.BOOLEAN,
    week10: DataTypes.BOOLEAN,
    week11: DataTypes.BOOLEAN,
    week12: DataTypes.BOOLEAN,
    week13: DataTypes.BOOLEAN,
    week14: DataTypes.BOOLEAN,
    week15: DataTypes.BOOLEAN,
    week16: DataTypes.BOOLEAN,
    week17: DataTypes.BOOLEAN,
    week18: DataTypes.BOOLEAN,
    week19: DataTypes.BOOLEAN,
    week20: DataTypes.BOOLEAN,
    week21: DataTypes.BOOLEAN,
    week22: DataTypes.BOOLEAN,
    week23: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};