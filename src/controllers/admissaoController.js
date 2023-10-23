const AdmissaoService = require("../services/admissaoService");

class AdmissaoController {
  
  static async previsualizaPlanilha(req, res, next) {
    try {
      const file = req.file.path;
      
      if (!file) {
        next("Arquivo não encontrado na requisição.", 400);
      }

      const response = await AdmissaoService.processaPlanilha(file);
      console.log(response)
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }

  }
}

module.exports = AdmissaoController;