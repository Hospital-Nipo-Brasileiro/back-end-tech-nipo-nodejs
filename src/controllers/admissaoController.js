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
      const outputPathNipo = `C:/Users/sup.gustavo/Documents/back-end-tech-nipo-nodejs/src/csv-process/${diaAdmissao}-admissao.csv`;
      // const outputPathMac = `/Users/gusta/Desktop/TechNipo/back-end-tech-nipo-nodejs/src/csv-process${diaAdmissao}-admissao.csv`;
      await writeFileAsync(outputPathNipo, csvData, "utf8");
      const users = outputPathNipo;
      const usersReceived = await AdmissaoService.criarFormatacaoAcessos(users, diaAdmissao);
      
      //TESTE
      for (const user of usersReceived) {
        const nome = user.nome;
        const acesso = user.acessos;
        const email = user.email;
        const usuario = user.usuario;
        const senha = user.senha;
        await AdmissaoService.gerarDocumentoPython(nome, acesso, email, usuario, senha);
      }
      

      res.status(200).send(usersReceived);

    } catch (err) {
      next(err);
    }

  }
}

module.exports = AdmissaoController;