const axios = require("axios");
const DeskManagerService = require("../services/DeskManagerService.js");

class DeskManagerController {
       
  static async autenticar(req, res, next){

    const operatorKey = "1979133fd997e784df00f8d3a4855b9491baaac5"; //CHAVE DE OPERADOR MAURICIO
    const enviromentKey = "2f9e6f32abaaf94b6e161a556343e947020908f5"; //CHAVE AMBIENTE

    try{
      const response = await axios.post("https://api.desk.ms/Login/autenticar",
        {PublicKey : enviromentKey},
        {headers : {Authorization : operatorKey, JsonPath: true}}
      );
    
      if(response.status === 200 && response.data && response.data.access_token) {
        res.send(response.data.access_token); 
      } else if (response.status === 200 && response.data && response.data.erro) {
        next(response.data.erro, 400);
      } else {
        next("Token not received or response format is incorrect", 400);
      }
    } catch (error){
      next(`Error at authentication: ${error.message}`);
    }
  }

  
  static async visualizaUsuarios(req, res, next) {    

    try {
      const file = "./src/controllers/tst.csv"; // Substitua pelo caminho correto do arquivo CSV
      const usuarios = await DeskManagerService.readCSV(file, res);
  
      // Aqui você pode retornar uma resposta HTTP com os usuários encontrados
      res.json(usuarios);
    } catch (error) {
      console.error("Erro ao visualizar usuários:", error.message);
      next("Erro ao visualizar usuários.", 500);
    }
    
  }

}

module.exports = DeskManagerController;