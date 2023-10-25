const XlsxPopulate = require("xlsx-populate");
const csv = require("csv");
const csvParser = require("csv-parser");
const fs = require("fs");
const diacritics = require("diacritics");


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

  static async formatarLocal(local, localCode) {
    if(local === "HNB") {
      localCode = "H";
      return localCode;
    } 
    else if (local === "CMD"){
      localCode = "L";
      return localCode;
    }
    else if (local === "SMA"){
      localCode = "S";
      return localCode;
    }
    else {
      throw new Error("Local não identificado!");
    }
  }

  static async formatarTipoContrato(tipoContrato, tipoContratoCode) {
    if(tipoContrato === "CLT") {
      tipoContratoCode = "C"
      return tipoContratoCode
    } else if (tipoContrato === "Terceiro") {
      tipoContratoCode = "X"
      return tipoContratoCode
    } else if (tipoContrato === "Temporário") {
      tipoContratoCode = "T"
      return tipoContratoCode
    } else if (tipoContrato === "Temporária") {
      tipoContratoCode = "T"
      return tipoContratoCode
    } else if (tipoContrato === "Estágio") {
      tipoContratoCode = "E"
      return tipoContratoCode
    } else if (tipoContrato === "Estagiário") {
      tipoContratoCode = "E"
      return tipoContratoCode
    } else if (tipoContrato === "Estagiária") {
      tipoContratoCode = "E"
      return tipoContratoCode
    } else {
      throw new Error("Local não identificado!");
    }
  };


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
          reject("O cabeçalho desta planilha não está correto.");
        }

        const csvData = await this.convertToCSV(workbook.sheet(0));
        resolve(csvData);

      } catch (error) {
        reject(error);
      }
    });
  }

  static async setUsers(file, diaAdmissao){
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(file)
        .pipe(csvParser({ separator: ";"}))
        .on("data", async (data) => {

          console.log("Arquivo lido: ", data);

          const acessosUsuario = [];
          const nome = data["Nome do contratado"];
          const cpf = data["Contratados CPF"];
          const local = data["Local"];
          const admissao = diaAdmissao;
          const tipoContrato = data["Tipo de contratação"];
          const acessos = data["Quais acessos a sistemas essa pessoa precisa ter?"]

          let cpfUser = "";
          let cpfPassword = "";
          let localCode = "";
          let tipoContratoCode = "";
          let emailDomain = "";
          let email = "";

          if(acessos && cpf && local && admissao && tipoContrato){
            cpfUser = await this.formatarCPFUsuario(cpf);
            cpfPassword = await this.formatarCPFSenha(cpf);
            const localCodeRecebido = await this.formatarLocal(local, localCode);
            const tipoContratoRecebido = await this.formatarTipoContrato(tipoContrato, tipoContratoCode)
            const allAccess = acessos.split(", ");

            if (allAccess.includes("DeskManager") || allAccess.includes("Conta de e-mail")) {
              if (allAccess.includes("Email")) {
                emailDomain = "@hnipo.org.br";
              } else {
                emailDomain = "@desk.ms";
              }

              // Remover acentuações do nome
              const nameWithoutDiacritics = diacritics.remove(nome);
    
              // Separar o nome em partes
              const partsOfName = nameWithoutDiacritics.trim().split(" ");
              const firstName = partsOfName[0].trim();
              const lastName = partsOfName[partsOfName.length - 1].trim();

              // Criação das novas variáveis com os nomes em letras minúsculas
              const firstNameEmail = firstName.toLowerCase().trim();
              const lastNameEmail = lastName.toLowerCase().trim();

              const email = `${firstNameEmail}.${lastNameEmail}${emailDomain}`;

              acessosUsuario.push(email);
              results.push(acessosUsuario);
            }
            const usernameFormated = `${localCodeRecebido}${tipoContratoRecebido}${cpfUser}`;
            console.log(usernameFormated);

            const passwordFormated = `${local}@${cpfPassword}*${admissao}`;
            console.log(passwordFormated);

            acessosUsuario.push(acessos, nome, usernameFormated, passwordFormated);
            results.push(acessosUsuario);
          }
        })
        .on("end", () => {
          console.log("CSV file processado");
          console.log("Este é o resultado: ", results);
          resolve(results);
        })
        .on("error", (error) => {
          reject("Erro ao processar o arquivo CSV:", error);
        });
    });
  }
}

module.exports = AdmissaoService;