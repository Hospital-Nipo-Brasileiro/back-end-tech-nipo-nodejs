/* eslint-disable no-unused-vars */
const { default: axios } = require("axios");
const AdmissaoService = require("../services/admissaoService.js");
const DeskManagerService = require("../services/deskManagerService.js");

require("dotenv").config();

const fs = require("fs");
const { promisify } = require("util");
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
      console.log(usersReceived);
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
      
      for (const body of deskUser) {
        try {
          const usuarioCriado = await axios.put(url, body, headers);
          
          if (usuarioCriado.status >= 400) {
            next(`Erro server DeskManager: ${usuarioCriado.statusText}`, usuarioCriado.status);
          }
        
        } catch (err) {
          next(`Erro ao salvar usuário: ${err.message}`, 500);
        }
      }

      res.status(200).send("Usuários criados");

    } catch (err) {
      next(`Erro ao salvar solicitante: ${err.message}`, 500);
    }
  }

  static async concluirAdmissao(req, res, next) {
    const usersReceived = req.fileUsers;
    
    try {
      for (const user of usersReceived) {
        const nome = user.nome;
        const acesso = user.acessos;
        const email = user.email;
        const usuario = user.usuario;
        const senha = user.senha;
        await AdmissaoService.gerarDocumentoPython(nome, acesso, email, usuario, senha);
      }
  
      res.status(200).send("Acessos criados e enviados para o servidor");
    } catch (err) {
      next(err);      
    }
  }
}

module.exports = AdmissaoController;