/* eslint-disable no-unused-vars */
const { default: axios } = require("axios");
const AdmissaoService = require("../services/admissaoService.js");
<<<<<<< HEAD
const DeskManagerService = require("../services/DeskManagerService.js");
=======
const DeskManagerService = require("../services/deskManagerService.js");
const database = require("../models");
const os = require("os");
>>>>>>> develop

require("dotenv").config();

const fs = require("fs");
const { promisify } = require("util");
const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const writeFileAsync = promisify(fs.writeFile);

class AdmissaoController {

  static async previsualizaPlanilha(req, res, next) {
    try {
      const file = req.file.path;
      const diaAdmissao = req.body.diaAdmissao;

      if (!file) {
        next("Arquivo não encontrado na requisição.", 400);
      }

      const csvData = await AdmissaoService.processaPlanilha(file, diaAdmissao);
      const outputPathNipo = `C:/Users/sup.gustavo/Documents/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      // const outputPathMac = `/Users/gusta/Desktop/TechNipo/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      await writeFileAsync(outputPathNipo, csvData, "utf8");
      const users = outputPathNipo;
      const usersReceived = await AdmissaoService.criarFormatacaoAcessos(users, diaAdmissao);
      
      res.status(200).send(usersReceived);
    } catch (err) {
      next(err);
    }
  }

  static async formataPlanilha(req, res, next) {
    try {
      const file = req.file.path;
      const diaAdmissao = req.body.diaAdmissao;

      if (!file) {
        next("Arquivo não encontrado na requisição.", 400);
      }

      
      const csvData = await AdmissaoService.processaPlanilha(file, diaAdmissao);
      const outputPathNipo = `C:/Users/sup.gustavo/Documents/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      // const outputPathMac = `/Users/gusta/Desktop/TechNipo/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      await writeFileAsync(outputPathNipo, csvData, "utf8");
      const users = outputPathNipo;
      const usersReceived = await AdmissaoService.criarFormatacaoAcessos(users, diaAdmissao);

      req.fileUsers = usersReceived;
      next();
      
    } catch (err) {
      next(err);
    }
  }

  static async autenticar(req, res, next){
    const OPERATOR_KEY = process.env.OPERATOR_KEY;
    const ENVIROMENT_KEY = process.env.ENVIROMENT_KEY;    

    try{
      const response = await axios.post("https://api.desk.ms/Login/autenticar",
        {PublicKey : ENVIROMENT_KEY},
        {headers : {Authorization : OPERATOR_KEY, JsonPath: true}}
      );
    
      if(response.status === 200 && response.data && response.data.access_token) { 
        req.accessToken = response.data.access_token;
        next();

      } else if (response.status === 200 && response.data && response.data.erro) {
        next(response.data.erro, 400);
      } else {
        next("Token not received or response format is incorrect", 400);
      }
    } catch (error){
      next(`Error at authentication: ${error.message}`);
    }
  }

  static async criarDeskManager(req, res, next) {
    const url = "https://api.desk.ms/Usuarios";

    try {
      const token = req.accessToken;
      const usersReceived = req.fileUsers;
      const deskUser = await DeskManagerService.criarDeskManagerUser(usersReceived);
      
      if (!token) {
        next("Erro na autenticação. Token não obtido.", 400);
      }
      
      const headers = { headers: { Authorization: token }};  
      const emails = [];
      
      for (const body of deskUser) {
        try {
          const usuarioCriado = await axios.put(url, body, headers);
          
          if (usuarioCriado.status >= 400) {
            next(`Erro server DeskManager: ${usuarioCriado.statusText}`, usuarioCriado.status);
          }

          emails.push(body.TUsuario.Email);
        
        } catch (err) {
          next(`Erro ao salvar usuário: ${err.message}`, 500);
        }
      }

      res.status(200).send(`Usuários criados: ${emails}`);

    } catch (err) {
      next(`Erro ao salvar solicitante: ${err.message}`, 500);
    }
  }

  static async criaUmaPessoaAutomatico (req, _, next) {
    const usersReceived = req.fileUsers;
  
    try {
      for(const user of usersReceived) {
        const cpf = user.cpf;
    
        const novaPessoa = {
          ds_nome: user.nome,
          nr_cpf: cpf,
          dt_admissao: new Date(),
          tp_contrato: user.tipoContrato,
          id_login: req.userId,
          id_login_last_updated: req.userId,
          dt_created: new Date(),
          dt_updated: new Date(),
        };
    
        try {
          const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: {nr_cpf: cpf}});
    
          if (pessoaEncontrada) {
            next(new ErroBase(`Já existe uma pessoa com este cpf ${cpf}`, 409));
          }
          
          const novaPessoaCriada = await database.TN_T_PESSOA.create(novaPessoa);

          const objectCargo = {
            ds_nome: user.cargo,
          };
          const objectSetor = {
            ds_nome: user.area,
            ds_local: user.local,
            ds_email_cordenacao: user.emailCoord
          };

          

          const cargoEncontrado = await AdmissaoService.encontraOuCriaTabela("TN_T_CARGO", objectCargo, objectCargo);
          const setorEncontrado = await AdmissaoService.encontraOuCriaTabela("TN_T_SETOR", { ds_nome: user.area }, objectSetor);

          const objectCargoSetor = {
            id_cargo: cargoEncontrado.id,
            id_setor: setorEncontrado.id,
          };

          const cargoSetorEncontrado = await AdmissaoService.encontraOuCriaTabela("TN_T_CARGO_SETOR", objectCargoSetor, objectCargoSetor);

          const objectPessoaCargo = {
            id_pessoa: novaPessoaCriada.id,
            id_cargo_setor: Number(cargoSetorEncontrado.id)
          };

          const vinculaCargoAUmaPessoa = await AdmissaoService.encontraOuCriaTabela("TN_T_PESSOA_CARGO", objectPessoaCargo, objectPessoaCargo);

          for(const sistema of user.acessos) {
            const sistemaEncontrado = await database.TN_T_SISTEMA.findOne({ where: { ds_nome: sistema } });

            if(!sistemaEncontrado) {
              const pessoaSistemaExistente = await database.TN_T_SISTEMA_PESSOA.findAll({ where: {id_pessoa: novaPessoaCriada.id}});

              if(pessoaSistemaExistente) {
                console.error(`Acesso não encontrado pelo nome ${sistema}.`);
              } else {
                await database.TN_T_PESSOA.destroy({ where: {id: novaPessoaCriada.id}});
                next(new NaoEncontrado(`Acesso não encontrado pelo nome ${sistema}, apagando pessoa pré-criada`));
              }
            } else {
              if(sistema === "DeskManager" || sistema === "Email") {
                const novoSistemaPorPessoa = {
                  id_pessoa: novaPessoaCriada.id,
                  id_sistema: sistemaEncontrado.id,
                  id_login: req.userId,
                  id_login_last_updated: req.userId,
                  ds_usuario: user.email,
                  ds_senha: user.senha,
                  dt_created: new Date(),
                  dt_updated: new Date(),
                };
    
                await database.TN_T_SISTEMA_PESSOA.create(novoSistemaPorPessoa);
              } else {
                const novoSistemaPorPessoa = {
                  id_pessoa: novaPessoaCriada.id,
                  id_sistema: sistemaEncontrado.id,
                  ds_usuario: user.usuario,
                  ds_senha: user.senha,
                  id_login: req.userId,
                  id_login_last_updated: req.userId,
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
      return next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async concluirAdmissao(req, res, next) {
    const usersReceived = req.fileUsers;
    const usuarioDeRede = os.userInfo().username;
    
    try {
      for (const user of usersReceived) {
        const nome = user.nome;
        const acesso = user.acessos;
        const email = user.email;
        const usuario = user.usuario;
        const senha = user.senha;
        await AdmissaoService.gerarDocumentoPython(nome, acesso, email, usuario, senha, usuarioDeRede);
      }
  
      res.status(200).send("Acessos criados e enviados para o servidor");
    } catch (err) {
      next(err);      
    }
  }
  
}



module.exports = AdmissaoController;