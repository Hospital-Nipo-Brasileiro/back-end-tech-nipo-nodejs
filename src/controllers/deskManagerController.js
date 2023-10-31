// const axios = require("axios");
// const DeskManagerService = require("../services/deskManagerService.js");
// require("dotenv").config();

// class DeskManagerController {
       
  

//   static async visualizaUsuariosEMostra(req, res, next) {    

//     try {
//       const file = req.file.path;
      
//       if (!file) {
//         next("Arquivo não encontrado na requisição.", 400);
//       }
      
//       const usuarios = await DeskManagerService.readCSV(file, res);
      
//       req.fileData = usuarios; 
      
//       res.send(usuarios);
      
//     } catch (error) {
//       console.error("Erro ao visualizar usuários:", error.message);
//       next("Erro ao visualizar usuários.");
//     }
    
//   }

//   static async visualizaUsuarios(req, res, next) {
//     const file = req.file.path; 

//     try {
//       const usuarios = await DeskManagerService.readCSV(file, res);
//       req.fileData = usuarios;
//       next();
//     } catch (error) {
//       next("Erro ao visualizar usuários.");
//     }
    
//   }

//   static async criaUsuarios(req, res, next) {
//     const url = "https://api.desk.ms/Usuarios";
    
//     try {
//       const token = req.access_token;
//       const usuarios = req.fileData;      
//       if (!token) {
//         next("Erro na autenticação. Token não obtido.", 400);
//       }
//       const headers = { headers: { Authorization: token }};      
      
//       for (const body of usuarios) {
//         try {
//           const usuarioCriado = await axios.put(url, body, headers);
          
//           if (usuarioCriado.status >= 400) {
//             next(`Erro server DeskManager: ${usuarioCriado.statusText}`, usuarioCriado.status);
//           }
        
//         } catch (error) {
//           next(`Erro ao salvar usuário: ${error.message}`, 500);
//         }
//       }
  
//       res.status(200).send("Usuários criados");
      

//     } catch (error) {
//       next(`Erro ao salvar solicitante: ${error.message}`, 500);
//     }
//   }

// }

// module.exports = DeskManagerController;