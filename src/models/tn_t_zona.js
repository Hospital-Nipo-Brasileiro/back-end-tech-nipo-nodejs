"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_ZONA extends Model {
    static associate(models) {
      TN_T_ZONA.belongsTo(models.TN_T_ESTOQUE, {foreignKey: "id_estoque"});
    }
  }
  TN_T_ZONA.init({
    id_estoque: DataTypes.STRING
  }, {
    sequelize,
    modelName: "TN_T_ZONA",
  });
  return TN_T_ZONA;
};