'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class picks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  picks.init({
    user: DataTypes.STRING,
    week1: DataTypes.STRING,
    week2: DataTypes.STRING,
    week3: DataTypes.STRING,
    week4: DataTypes.STRING,
    week5: DataTypes.STRING,
    week6: DataTypes.STRING,
    week7: DataTypes.STRING,
    week8: DataTypes.STRING,
    week9: DataTypes.STRING,
    week10: DataTypes.STRING,
    week11: DataTypes.STRING,
    week12: DataTypes.STRING,
    week13: DataTypes.STRING,
    week14: DataTypes.STRING,
    week15: DataTypes.STRING,
    week16: DataTypes.STRING,
    week17: DataTypes.STRING,
    week18: DataTypes.STRING,
    week19: DataTypes.STRING,
    week20: DataTypes.STRING,
    week21: DataTypes.STRING,
    week22: DataTypes.STRING,
    week23: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'picks',
  });
  return picks;
};