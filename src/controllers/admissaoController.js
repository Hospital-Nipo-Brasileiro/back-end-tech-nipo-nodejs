const AdmissaoService = require("../services/admissaoService");

class AdmissaoController {
  
  static async previsualizaPlanilha(req, res, next) {
    try {
      const file = req.file.path;
      
      if (!file) {
        next("Arquivo não encontrado na requisição.", 400);
      }

      const csvData  = await AdmissaoService.processaPlanilha(file);
      const users = await AdmissaoService.setUsers(csvData);

      res.status(200).send(users);

    } catch (err) {
      next(err);
    }

  }
}

module.exports = AdmissaoController;