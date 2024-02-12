const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
const ErroBase = require("../errors/ErroBase");
const LoginService = require("../services/loginService");
const validaPermissao = require("../middlewares/permissionador");


class LoginController {
  static async buscaTodosLogins(req, res, next) {
    // const permissaoNecessaria = "R-ADMIN";
    // const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      // await validaPermissaoNecessaria(req, res, next);

      const loginsEncontrados = await database.TN_T_LOGIN.findAll();

      if (!loginsEncontrados || loginsEncontrados.length === 0) {
        next(new NaoEncontrado("Não existe nenhum login encontrado no banco"));
      }

      res.status(200).send(loginsEncontrados);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }


  static async buscaLoginPorId(req, res, next) {
    const { id } = req.params;
    const permissaoNecessaria = "R-ADMIN";
    const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      await validaPermissaoNecessaria(req, res, next);

      const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });

      if (loginEncontrado) {
        res.status(200).send(loginEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de login não encontrado na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPessoaPorLogin(req, res, next) {
    const { id } = req.params;

    // const permissaoNecessaria = "R-ADMIN";
    // const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      // await validaPermissaoNecessaria(req, res, next);

      const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });

      if (!loginEncontrado) {
        next(new NaoEncontrado("Login não localizado!"));
      }

      const resultado = await LoginService.buscaPessoaPorLogin(id);

      if (resultado) {
        res.status(200).send(resultado);
      } else {
        next("Erro na busca");
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaLogin(req, res, next) {
    const idPessoa = req.body.id_pessoa;
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: { id: idPessoa } });
    const validaLoginExistente = await database.TN_T_LOGIN.findOne({ where: { id_pessoa: idPessoa } });
    const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { ds_username: req.body.ds_username } });


    const novaPessoa = {
      id_pessoa: req.body.id_pessoa,
      ds_username: req.body.ds_username,
      ds_email: req.body.ds_email,
      ds_password: await bcrypt.hash(req.body.ds_password, 10),
      dt_created: new Date(),
      dt_updated: new Date()
    };

    // const permissaoNecessaria = "W-ADMIN";
    // const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      // await validaPermissaoNecessaria(req, res, next);

      if (!pessoaEncontrada) {
        return next(new NaoEncontrado("Pessoa não encontrada"));
      }

      if (validaLoginExistente) {
        return next(new ErroBase(`${pessoaEncontrada.ds_nome} já tem login vinculado, username: ${validaLoginExistente.ds_username}`, 409));
      }

      if (usuarioExistente) {
        return next(new ErroBase("Não possível cadastrar um usuário já cadastrado", 409));
      }

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

    const permissaoNecessaria = validaPermissao("W-ALTERA-SENHA");
    try {
      await permissaoNecessaria(req, res, next);

      if (novaSenha === confirmaNovaSenha) {
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

  static async restauraUsuario(req, res, next) {
    const { id } = req.params;

    const permissaoNecessaria = "U-ADMIN";
    const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      await validaPermissaoNecessaria(req, res, next);

      const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });

      if (!loginEncontrado) {
        await database.TN_T_LOGIN.restore({ where: { id: Number(id) } });
        res.status(200).send(`Usuário de ID ${id} restaurado com sucesso!`);
      }

      next(new ErroBase("Id de login está ativo", 400));
    } catch (err) {
      next(err);
    }

  }

  static async resetaSenha(req, res, next) {
    const { id } = req.params;

    try {
      const usuarioExistente = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });
      if (!usuarioExistente) {
        next(new NaoEncontrado("Usuário não encontrado"));
        return;
      }

      const novaSenha = "Hospital@2023";

      if (novaSenha !== null) {
        const senhaEncriptada = await bcrypt.hash(novaSenha, 10);
        await database.TN_T_LOGIN.update({ ds_password: senhaEncriptada }, { where: { id: Number(id) } });
      } else {
        await database.TN_T_LOGIN.update({ ds_password: novaSenha }, { where: { id: Number(id) } });
      }

      res.status(200).send("Senha redefinida com sucesso.");
    } catch (err) {
      console.error("Erro ao redefinir senha: ", err);
      next(err);
    }
  }

  static async desativaLogin(req, res, next) {
    const { id } = req.params;

    const permissaoNecessaria = "D-ADMIN";
    const validaPermissaoNecessaria = validaPermissao(permissaoNecessaria);
    try {
      await validaPermissaoNecessaria(req, res, next);

      const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: Number(id) } });

      if (!loginEncontrado) {
        next(new NaoEncontrado("Id de login não encontrado"));
      }

      await database.TN_T_LOGIN.destroy({ where: { id: Number(id) } });
      res.status(200).send(`Usuário de ID ${id} desativado com sucesso!`);

    } catch (err) {
      next(err);
    }
  }

}

module.exports = LoginController;