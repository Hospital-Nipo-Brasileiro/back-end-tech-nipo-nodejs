const AdmissaoService = require("../services/admissaoService.js");
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
      const outputPath = `C:/Users/sup.gustavo/Documents/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      await writeFileAsync(outputPath, csvData, "utf8");
      const users = outputPath;
      const usersReceived = await AdmissaoService.setUsers(users, diaAdmissao);

      res.status(200).send(usersReceived);

    } catch (err) {
      next(err);
    }

  }
}

module.exports = AdmissaoController;