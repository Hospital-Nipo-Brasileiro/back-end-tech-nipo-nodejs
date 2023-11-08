const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
const ErroBase = require("../errors/ErroBase");

class LoginController {
  static async buscaTodosLogins(req, res, next) {
    const loginsEncontrados = await database.TN_T_LOGIN.findAll();
    try {
      if (!loginsEncontrados) {
        next(new NaoEncontrado("Não existe nenhum login encontrado no banco"));
      }
      res.status(200).send(loginsEncontrados);
    } catch (err) {
      next(err);
    }
  }

  static async buscaLoginPorId(req, res, next) {
    const { id } = req.params;
    const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });
    try {
      if (loginEncontrado) {
        res.status(200).send(loginEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de login não encontrado na busca.`));
      }
    } catch (err) {
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
      console.log("cheguei");
      if (!pessoaEncontrada) {
        console.log("pessoa nao enc");
        next(new NaoEncontrado("Pessoa não encontrada"));
      }
      console.log("cai aqui");
      const novoLogin = await database.TN_T_LOGIN.create(novaPessoa);
      res.status(201).send(novoLogin);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    const { ds_username, ds_password } = req.body;
    const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { ds_username: ds_username } });
  
    try {
      if (!usuarioExistente) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }
  
      const validaSenha = await bcrypt.compare(ds_password, usuarioExistente.ds_password);
  
      if (validaSenha !== true) {
        next(new ErroBase("Senha incorreta, por favor insira novamente", 401));
      }
      const token = jwt.sign({ userId: usuarioExistente.id }, "seuSegredoToken", {
        expiresIn: "5h"
      });
  
      if (validaSenha === true) {
        res.status(200).send({ token, userId: usuarioExistente.id });
      }
    } catch (err) {
      console.error("Erro ao logar: ", err);
      next(err);
    }
  }
  

  static async alteraSenha(req, res, next) {
    const { id } = req.params;
    const { senhaAtual, novaSenha, confirmaNovaSenha } = req.body;
  
    try {
      if(novaSenha === confirmaNovaSenha) {
        const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });
    
        if (!usuarioExistente) {
          next(new NaoEncontrado("Usuário não encontrado"));
          return;
        }
    
        const senhaCorrespondente = await bcrypt.compare(senhaAtual, usuarioExistente.ds_password);
    
        if (!senhaCorrespondente) {
          next(new ErroBase("Senha atual incorreta. Não é possível alterar a senha.", 401));
          return;
        }
    
        const senhaEncriptada = await bcrypt.hash(novaSenha, 10);
    
        await database.TN_T_LOGIN.update({ ds_password: senhaEncriptada }, { where: { id: id } });
    
        res.status(200).send("Senha alterada com sucesso.");
      } else {
        next(new ErroBase("Senhas divergentes!"), 404);
      }
    } catch (err) {
      console.error("Erro ao alterar senha: ", err);
      next(err);
    }
  }

  static async resetaSenha(req, res, next) {
    const {id} = req.params;
    console.log("teste");
  
    try {
      console.log(id);
      const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { id: Number(id)}});
      console.log(usuarioExistente);
      if (!usuarioExistente) {
        next(new NaoEncontrado("Usuário não encontrado"));
        return;
      }

      const novaSenha = "Hospital@2023";
  
      if (novaSenha !== null) {
        const senhaEncriptada = await bcrypt.hash(novaSenha, 10);
        await database.TN_T_LOGIN.update({ ds_password: senhaEncriptada }, { where: { id: Number(id) } });
      } else {
        await database.TN_T_LOGIN.update({ ds_password: novaSenha }, { where: { id: Number(id)}});
      }
  
      res.status(200).send("Senha redefinida com sucesso.");
    } catch (err) {
      console.error("Erro ao redefinir senha: ", err);
      next(err);
    }
  }

}

module.exports = LoginController;