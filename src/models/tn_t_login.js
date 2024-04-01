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
      TN_T_LOGIN.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login"});
      TN_T_LOGIN.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login_last_updated"});
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

  TN_T_LOGIN.afterCreate(async (login, options) => {
    console.log("After create hook triggered for login:", login.id);

    const { TN_AUDIT_LOGIN } = sequelize.models;

    try {
      await TN_AUDIT_LOGIN.create({
        ds_username: login.ds_username,
        ds_email: login.ds_email,
        ds_password: login.ds_password,
        ds_action: "create",
        id_login: login.id_login,
        id_login_last_updated: login.id_login_last_updated, 
        dt_created: login.dt_created,
        dt_updated: login.dt_updated,
      }, { transaction: options.transaction });
  
      console.log("Audit log created successfully.");
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  });

  TN_T_LOGIN.afterUpdate(async (login, options) => {
    console.log("After update hook triggered for pessoa");
    const { TN_AUDIT_PESSOA } = sequelize.models;
    const transaction = options.transaction || await sequelize.transaction();

    if(login.dt_deleted !== null) {
      try {
        await TN_AUDIT_PESSOA.create({
          ds_username: login.ds_username,
          ds_email: login.ds_email,
          ds_password: login.ds_password,
          ds_action: "delete",
          id_login: login.id_login,
          id_login_last_updated: login.id_login_last_updated, 
          dt_created: login.dt_created,
          dt_updated: login.dt_updated,
        }, { transaction });
  
        await transaction.commit();
        console.log("Audit log created successfully.");
      } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error creating audit log:", error);
      }
    }

    try {
      await TN_AUDIT_PESSOA.create({
        ds_username: login.ds_username,
        ds_email: login.ds_email,
        ds_password: login.ds_password,
        ds_action: "update",
        id_login: login.id_login,
        id_login_last_updated: login.id_login_last_updated, 
        dt_created: login.dt_created,
        dt_updated: login.dt_updated,
      }, { transaction });

      await transaction.commit();
      console.log("Audit log created successfully.");
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating audit log:", error);
    }
  });

  return TN_T_LOGIN;
};