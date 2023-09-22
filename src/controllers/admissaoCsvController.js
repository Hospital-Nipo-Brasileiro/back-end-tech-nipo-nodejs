const AdmissaoCsvService = require("../services/admissaoCsvService");

class AdmissaoCsvController {
  
  static async previsualizaPlanilhaCSV(req, res, next) {
    const file = req.body.file;
    try {
      const planilhaValida = await AdmissaoCsvService.processaPlanilhaCSV(file);
      if(!planilhaValida) {
        next("Planilha não recebida no formato correto", 400);
      }
      res.status(200).send(planilhaValida);
    } catch (err) {
      next(err);
    }

  }
}

module.exports = AdmissaoCsvController;