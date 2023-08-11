const axios = require("axios");
const DeskManagerService = require("../services/DeskManagerService.js");
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo

class DeskManagerController {
       
  static async autenticar(req, res, next){
    const OPERATOR_KEY = "1979133fd997e784df00f8d3a4855b9491baaac5";
    const ENVIROMENT_KEY = "2f9e6f32abaaf94b6e161a556343e947020908f5";

    

    try{
      const response = await axios.post("https://api.desk.ms/Login/autenticar",
        {PublicKey : ENVIROMENT_KEY},
        {headers : {Authorization : OPERATOR_KEY, JsonPath: true}}
      );
    
      if(response.status === 200 && response.data && response.data.access_token) { 
        req.access_token = response.data.access_token;
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

  static async visualizaUsuariosEMostra(req, res, next) {    

    try {
      const file = req.file.path;
      
      if (!file) {
        next("Arquivo não encontrado na requisição.", 400);
      }
      
      const usuarios = await DeskManagerService.readCSV(file, res);
      
      // Armazena os usuários na requisição para uso posterior
      req.fileData = usuarios; 
      
      // Aqui você pode retornar uma resposta HTTP com os usuários encontrados
      res.send(usuarios);
      
    } catch (error) {
      console.error("Erro ao visualizar usuários:", error.message);
      next("Erro ao visualizar usuários.");
    }
    
  }

  static async visualizaUsuarios(req, res, next) {    

    const file = req.file.path; 

    try {
      const usuarios = await DeskManagerService.readCSV(file, res);

      // Armazena os usuários na requisição para uso posterior
      req.fileData = usuarios;     
      next();

    } catch (error) {
      next("Erro ao visualizar usuários.");
    }
    
  }

  static async criaUsuarios(req, res, next) {
    const url = "https://api.desk.ms/Usuarios";
    
    try {
      // Perform authentication to get the token
      const token = req.access_token;

      const usuarios = req.fileData;
      
      if (!token) {
        next("Erro na autenticação. Token não obtido.", 400);
      }

      // Prepare the headers with the authorization token
      const headers = { headers: { Authorization: token } };

      const usuariosCriados = [];
      
      for (const usuario of usuarios) {
        try {
          const usuarioCriado = await axios.put(url, usuario.TUsuario, headers);
          usuariosCriados.push(usuarioCriado.data);
        } catch (error) {
          console.error(`Erro ao salvar usuário: ${error.message}`);
          usuariosCriados.push({ error: `Erro ao salvar usuário: ${error.message}` });
        }
      }
  
      res.json({ usuariosCriados });

    } catch (error) {
      next(`Erro ao salvar solicitante: ${error.message}`, 500);
    }
  }

}

module.exports = DeskManagerController;