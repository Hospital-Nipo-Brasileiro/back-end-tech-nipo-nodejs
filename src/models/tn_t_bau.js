'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TN_T_BAU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TN_T_BAU.init({
    id_zona: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TN_T_BAU',
  });
  return TN_T_BAU;
};