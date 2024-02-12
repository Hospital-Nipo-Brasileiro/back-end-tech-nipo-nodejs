// const bcrypt = require("bcrypt");
"use strict";
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_LOGIN extends Model {
    static associate(models) {
      TN_T_LOGIN.belongsTo(models.TN_T_PESSOA, {foreignKey: "id_pessoa"});
      TN_T_LOGIN.hasMany(models.TN_T_LOGIN_PAPEL, {foreignKey: "id_login"});
    }
  }
  TN_T_LOGIN.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    ds_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ds_email: DataTypes.STRING,
    ds_password: {
      type: DataTypes.STRING,
      allowNull: false
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