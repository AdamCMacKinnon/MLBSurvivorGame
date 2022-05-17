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
      models.picks.belongsTo(users)
    }
  };
  picks.init({
    id: DataTypes.UUID,
    username: DataTypes.STRING,
    picks: DataTypes.ARRAY
  }, {
    sequelize,
    modelName: 'picks',
  });
  return picks;
};