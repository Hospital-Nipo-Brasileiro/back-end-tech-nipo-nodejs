const csv = require("csv-parser");
const fs = require("fs");

class AdmissaoCsvService {
  static async processaPlanilhaCSV(file, diaAdmissao) {

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
      "Coluna1",
      "Lista de distribuição (e-mail)",
      "Informar usuário para cópia do perfil",
      "Horário de trabalho",
      "Gestor",
      "Prestador",
      "Local"
    ];

    await new Promise((resolve, reject) => {
      const parser = csv({ headers: expectedHeaders })
        .on("data", (data) => {     
          async function formatarCPFUsuario(cpf) {
            //REMOVER O QUE NÃO FOR NÚMERO
            const cpfFormatado = cpf.replace(/\D/g, ""); 
            return cpfFormatado.slice(0, 8);
          }

          async function formatarCPFSenha(cpf) {
            //REMOVER O QUE NÃO FOR NÚMERO
            const cpfFormatado = cpf.replace(/\D/g, ""); 
            return cpfFormatado.slice(0, 3);
          }
      
          const acessos = [];
      
          data.forEach(async (item) => {
            const local = item["Local"];
            const admissao = diaAdmissao;
            const tipoContrato = item["Tipo de Contratação"];
            const cpfUser = await formatarCPFUsuario(item["Contratados CPF"]);
            const cpfPassword = await formatarCPFSenha(item["Contratados CPF"]);

      
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
              const passwordFormated = `${local}@${cpfPassword}*${admissao}`;

              acessos.push(usernameFormated, passwordFormated);
              results.push(data);

            }
          });
          return results;
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(new Error("O arquivo recebido não é do tipo CSV ou header errados", error.message));
        });

      fs.createReadStream(file)
        .pipe(parser);
    });

    return results;
  }
}

module.exports = AdmissaoCsvService;