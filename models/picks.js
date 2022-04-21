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
      models.users.hasMany(models.picks, { foreignKey: "id" })
    }
  };
  picks.init({
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING,
    week: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'picks',
  });
  return picks;
};