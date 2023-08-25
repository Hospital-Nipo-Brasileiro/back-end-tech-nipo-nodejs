const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
const ErroBase = require("../errors/ErroBase");

class LoginController {
  static async buscaTodosLogins(req, res, next) {
    const loginsEncontrados = await database.TN_T_LOGIN.findAll();
    try{
      if(!loginsEncontrados){
        next(new NaoEncontrado("Não existe nenhum login encontrado no banco"));
      }
      res.status(200).send(loginsEncontrados);
    } catch (err) {
      next(err);
    }
  }

  static async buscaLoginPorId(req, res, next) {
    const {id} = req.params;
    const loginEncontrado = await database.TN_T_LOGIN.findOne({where : {id: Number(id)}});
    try{
      if(loginEncontrado){
        res.status(200).send(loginEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de login não encontrado na busca.`));
      }
    }catch (err) {
      next(err);
    }
  }

  static async criaLogin(req, res, next) {
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: { id: Number(req.body.id_pessoa) } });

    const novaPessoa = {
      id_pessoa: req.body.id_pessoa,
      ds_username: req.body.ds_username,
      ds_email: req.body.ds_email,
      ds_password: req.body.ds_password,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      if (!pessoaEncontrada) {
        next(new NaoEncontrado("Pessoa não encontrada"));
      } else {
        const novoLogin = await database.TN_T_LOGIN.create(novaPessoa);
        res.status(201).send(novoLogin);
      }
      
      
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { ds_username, ds_password } = req.body;
    const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { ds_username } });

    try {
      if (!usuarioExistente) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }

      const validaSenha = await bcrypt.compare(ds_password, usuarioExistente.ds_password);

      if (validaSenha !== true) {
        next(new ErroBase("Senha incorreta, por favor insira novamente", 401));
      }
      const token = jwt.sign({ userId: usuarioExistente.id }, "seuSegredoToken", {
        expiresIn: "1h"
      });

      if (validaSenha === true) {
        res.status(200).send(token);
      }
    } catch (err) {
      console.error("Erro ao logar: ", err);
      next(err);
    }

  }

}

module.exports = LoginController;