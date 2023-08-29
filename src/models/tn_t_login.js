const bcrypt = require("bcrypt");

"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_LOGIN extends Model {
    static associate(models) {
      TN_T_LOGIN.belongsTo(models.TN_T_PESSOA, {foreignKey: "id_pessoa"});
      TN_T_LOGIN.hasMany(models.TN_T_LOGIN_PAPEL, {foreignKey: "id"});
    }
  }
  TN_T_LOGIN.init({
    ds_username: DataTypes.STRING,
    ds_email: DataTypes.STRING,
    ds_password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const saltRounds = 10; // Número de saltos para o hash
        const hashedPassword = bcrypt.hashSync(value, saltRounds);
        this.setDataValue("ds_password", hashedPassword);
      }
    }
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_LOGIN",
    tableName: "TN_T_LOGIN",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_LOGIN;
};