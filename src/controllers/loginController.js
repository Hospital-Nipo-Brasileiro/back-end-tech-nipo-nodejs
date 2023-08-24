const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
const ErroBase = require("../errors/ErroBase");

class LoginController {
  static async createLogin(req, res, next) {
    const personFinded = await database.TN_T_PESSOA.findOne({ where: { id: Number(req.body.id_pessoa) } });

    const infos = {
      id_pessoa: req.body.id_pessoa,
      ds_username: req.body.ds_username,
      ds_email: req.body.ds_email,
      ds_password: req.body.ds_password,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      if (!personFinded) {
        return res.status(404).json({ message: "Pessoa não encontrada." });
      }

      const newLogin = await database.TN_T_LOGIN.create(infos);
      res.status(201).send(newLogin);
    } catch (err) {
      console.error("Erro ao criar login:", err);
      next(err);
    }
  }

  static async logon(req, res, next) {
    const { ds_username, ds_password } = req.body;
    const userExisted = await database.TN_T_LOGIN.findOne({ where: { ds_username } });

    try {
      if (!userExisted) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }

      const validPassword = await bcrypt.compare(ds_password, userExisted.ds_password);

      if (validPassword !== true) {
        next(new ErroBase("Senha incorreta, por favor insira novamente", 401));
      }
      const token = jwt.sign({ userId: userExisted.id }, "seuSegredoToken", {
        expiresIn: "1h"
      });

      if (validPassword === true) {
        res.status(200).send(token);
      }
    } catch (err) {
      console.error("ERRO AO LOGAR", err);
      next(err);
    }

  }

}

module.exports = LoginController;