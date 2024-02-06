const ErroBase = require("../errors/ErroBase");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
const AdmissaoService = require("../services/admissaoService");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

class MovimentacaoRegistrosController {
  static async processaPlanilha(req, _, next) {
    try {
      const file = req.file.path;

      if(!file) {
        next("Arquivo não recebido", 400);
      }

      const diaAdmissao = "0202";

      const csvData = await AdmissaoService.processaPlanilhaRegistrosCSV(file);
      const outputPathNipo = `C:/Users/sup.gustavo/Documents/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-registros.csv`;
      // const outputPathMac = `/Users/gusta/Desktop/TechNipo/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      await writeFileAsync(outputPathNipo, csvData, "utf-8");
      const users = outputPathNipo;
      const usersReceived = await AdmissaoService.formataPlanilhaRegistrosCSV(users);
      req.fileUsers = usersReceived;

      next();

    } catch (err) {
      next(err);
    }
  }

  static async criaPessoasESistema(req, res, next) {
    const usersReceived = req.fileUsers;
  
    try {
      for(const user of usersReceived) {
        console.log("MEU USER: ", user);
        const cpf = user.cpf;
    
        const novaPessoa = {
          ds_nome: user.nome,
          nr_cpf: cpf,
          dt_admissao: new Date(),
          tp_contrato: user.tipoContrato,
          ds_categoria_cargo: user.categoria,
          dt_created: new Date(),
          dt_updated: new Date(),
        };
    
        try {
          const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: {nr_cpf: Number(cpf)}});
    
          if (pessoaEncontrada) {
            next(new ErroBase(`Já existe uma pessoa com este cpf ${cpf}`, 409));
          }
          
          const novaPessoaCriada = await database.TN_T_PESSOA.create(novaPessoa);
          
          for(const sistema of user.acessos) {
            console.log("MEU SISTEMA É: ", sistema);
            const idSistema = await database.TN_T_SISTEMA.findOne({ where: { ds_nome: sistema } });

            if(!idSistema) {
              if (sistema.length > 1) {
                await database.TN_T_PESSOA.destroy({ where: {id: Number(novaPessoaCriada.id)}});
                next(new NaoEncontrado(`Acesso não encontrado pelo nome ${sistema}, apagando pessoa pré-criada`));
              } else {
                next(new NaoEncontrado(`Acesso não encontrado pelo nome ${sistema}.`));
              }
            } else {
              if(sistema === "DeskManager" || sistema === "Email") {
                const novoSistemaPorPessoa = {
                  id_pessoa: novaPessoaCriada.id,
                  id_sistema: idSistema.id,
                  ds_usuario: user.usuarioEmail,
                  ds_senha: user.senha,
                  dt_created: new Date(),
                  dt_updated: new Date(),
                };
    
                await database.TN_T_SISTEMA_PESSOA.create(novoSistemaPorPessoa);
              } else {
                const novoSistemaPorPessoa = {
                  id_pessoa: novaPessoaCriada.id,
                  id_sistema: idSistema.id,
                  ds_usuario: user.usuario,
                  ds_senha: user.senha,
                  dt_created: new Date(),
                  dt_updated: new Date(),
                };
    
                await database.TN_T_SISTEMA_PESSOA.create(novoSistemaPorPessoa);
              }
            }
          }
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
      res.status(200).send("Usuários criados");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = MovimentacaoRegistrosController;