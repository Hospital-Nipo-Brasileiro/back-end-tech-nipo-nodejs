const XlsxPopulate = require("xlsx-populate");
const csv = require("csv");
const csvParser = require("csv-parser");
const fs = require("fs");

class AdmissaoService {
  static async writeCSV(data) {
    const options = {
      delimiter: ";",
    };
    return new Promise((resolve, reject) => {
      csv.stringify(data, options, (err, output) => {
        if (err) {
          console.log("Deu erro: ", err);
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  }

  static async convertToCSV(sheet) {
    const data = sheet.usedRange().value();
    const csvData = await this.writeCSV(data);
    return csvData;
  }

  static async formatarCPFUsuario(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, ""); //REMOVER O QUE NÃO FOR NÚMERO
    return cpfFormatado.slice(0, 8);
  }

  static async formatarCPFSenha(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, ""); //REMOVER O QUE NÃO FOR NÚMERO
    return cpfFormatado.slice(0, 3);
  }

  static processaPlanilha(file) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const workbook = await XlsxPopulate.fromFileAsync(file);
        const cabecalhoRecebido = workbook.sheet(0).range("A1:S1");
        const values = cabecalhoRecebido.value();

        const expectedHeaders = [
          "Código da vaga",
          "Área",
          "Cargo",
          "Recrutador da vaga",
          "Criador(a) da Vaga",
          "Email do Criador(a)",
          "Nome do contratado",
          "Conselho Regional",
          "Contratados CPF",
          "Tipo de contratação",
          "No caso de substituição de pessoal, informe o colaborador a ser substituído.",
          "Quais acessos a sistemas essa pessoa precisa ter?",
          "Quais equipamentos e programas essa pessoa deve ter acesso?",
          "Lista de distribuição (e-mail)",
          "Informar usuário para cópia do perfil",
          "Horário de trabalho",
          "Ramal do gestor",
          "Prestador",
          "Local"
        ];

        if (JSON.stringify(values[0]) !== JSON.stringify(expectedHeaders)) {
          console.log("O QUE ESTÁ VINDO: ", JSON.stringify(values[0]));
          console.log("O QUE É ESPERADO: ", JSON.stringify(expectedHeaders));
          reject("O cabeçalho desta planilha não está correto.");
        }

        console.log("O QUE ESTÁ VINDO: ", JSON.stringify(values[0]));
        console.log("O QUE É ESPERADO: ", JSON.stringify(expectedHeaders));
        const csvData = await this.convertToCSV(workbook.sheet(0));
        console.log("cheguei 7: ", csvData);
        resolve(csvData);

      } catch (error) {
        reject(error);
      }
    });
  }

  static async setUsers(file, diaAdmissao) {
    const results = [];

    const expectedHeaders = [
      "Código da vaga",
      "Área",
      "Cargo",
      "Recrutador da vaga",
      "Criador(a) da Vaga",
      "Email do Criador(a)",
      "Nome do contratado",
      "Conselho Regional",
      "Contratados CPF",
      "Tipo de contratação",
      "No caso de substituição de pessoal, informe o colaborador a ser substituído.",
      "Quais acessos a sistemas essa pessoa precisa ter?",
      "Quais equipamentos e programas essa pessoa deve ter acesso?",
      "Lista de distribuição (e-mail)",
      "Informar usuário para cópia do perfil",
      "Horário de trabalho",
      "Ramal do gestor",
      "Prestador",
      "Local"
    ];

    try {
      const stream = fs.createReadStream(file);
      stream.pipe(csvParser({ headers: expectedHeaders }))
        .on("data", async (data) => {
          console.log("Dado lido:", data);

          const acessos = [];
          const cpfUser = "";
          const cpfPassword = "";
          const local = ["Local"];
          const admissao = diaAdmissao;
          const tipoContrato = data["Tipo de Contratação"];
          if (data["Contratados CPF"] && typeof data["Contratados CPF"] === "string") {
            cpfUser = await this.formatarCPFUsuario(data["Contratados CPF"]);
            cpfPassword = await this.formatarCPFSenha(data["Contratados CPF"]);
            return cpfUser, cpfPassword;
          }



          if (local && admissao && tipoContrato && cpfUser && cpfPassword) {
            const localCode = {
              HNB: "H",
              CMD: "L",
              SMA: "S"
            };

            const tipoContratoCode = {
              CLT: "C",
              Terceiro: "X",
              Temporário: "T",
              Temporária: "T",
              Estágio: "E",
              Estagiário: "E",
              Estagiária: "E"
            };

            const usernameFormated = `${localCode[local]}${tipoContratoCode[tipoContrato]}${cpfUser}`;
            console.log(usernameFormated);

            const passwordFormated = `${local}@${cpfPassword}*${admissao}`;
            console.log(passwordFormated);

            acessos.push(usernameFormated, passwordFormated);
            results.push(acessos);

          }

        })
        .on("end", () => {
          console.log("CSV file processado");
          console.log("Este é o resultado: ", results);
          return results;
        })
        .on("error", (error) => {
          console.error("Erro ao processar o arquivo CSV:", error);
          // Aqui, você pode rejeitar a promessa e lidar com o erro
        });

    } catch (error) {
      console.error("Erro ao abrir o arquivo:", error);
      // Aqui, você pode rejeitar a promessa e lidar com o erro
    }
  }
}


module.exports = AdmissaoService;