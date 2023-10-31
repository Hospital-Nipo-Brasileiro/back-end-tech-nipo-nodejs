const fs = require("fs");
const csv = require("csv-parser");
const diacritics = require("diacritics");


class DeskManagerService {
  static async formatarCodCliente(local, codCliente) {
    if (local === "HNB") {
      codCliente = 5;
      return codCliente;
    } else if (local === "CMD") {
      codCliente = 4;
      return codCliente;
    } else if (local === "SMA") {
      codCliente = 6;
      return codCliente;
    } else if (local === "MATRIZ") {
      codCliente = 3;
      return codCliente;
    } else {
      throw new Error("Local de cliente não encontrado no sistema!");
    }
  }

  static async criarBodyUsuarioDesk(codCliente, senha, email, nome, area, local) {
    // Remover acentuações do nome
    const nomeSemAcentuacao = diacritics.remove(nome);
    
    // Separar o nome em partes
    const nomePicotado = nomeSemAcentuacao.trim().split(" ");
    const primeiroNome = nomePicotado[0].trim();
    const sobrenome = nomePicotado.slice(1).join(" ");

    const body = {
      TUsuario: {
        Chave: "",
        CodCliente: codCliente,
        Senha: senha,
        ConfirmaSenha: senha,
        Email: email,
        Nome: primeiroNome,
        Sobrenome: sobrenome,
        NomeDepartamento: area,
        NomeLocal: local,

        // OBRIGATÓRIO
        Observacao: "",
        AdmAtivo: "N",
        GerenteAtivo: "N",
        OcultaUser: "N",
        CriaUsuarioAtivo: "S",
        AprovaChamadoAtivo: "N",
        VipAtivo: "S",
        VisualizaSLAContratoAtivo: "S",
        EmailDepLocalAtivo: "N",
        EmailSuporteAtivo: "S",
        SatisfacaoEmailAtivo: "S",
        SatisfacaoObrigAtivo: "N",
        NotificaoAtivo: "N",
        BoasVindas: "S",
        SMSAtivo: "S",
        GoogleAtivo: "S",
        MicrosoftAtivo: "S",
        AlteradPessoaisAtivo: "S",
        MudarSenhaAtivo: "S",
        Idioma: "pt-br",
      }
    };
    return body;
  }

  static readCSV(file) {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(file)
        .pipe(csv({ separator: ";" })) // Adicione a opção separator para indicar que o separador é ponto e vírgula
        .on("data", (data) => {
          if (data.Acessos) {
            const allAccess = data.Acessos.split(", ");

            if (allAccess.includes("DeskManager")) {
              let emailDomain = "";

              if (allAccess.includes("Email")) {
                emailDomain = "@hnipo.org.br";
              } else {
                emailDomain = "@desk.ms";
              }

              // Remover acentuações do nome
              const nameWithoutDiacritics = diacritics.remove(data.Nome);

              // Separar o nome em partes
              const partsOfName = nameWithoutDiacritics.trim().split(" ");
              const firstName = partsOfName[0].trim();
              const lastName = partsOfName[partsOfName.length - 1].trim();

              // Criação das novas variáveis com os nomes em letras minúsculas
              const firstNameEmail = firstName.toLowerCase().trim();
              const lastNameEmail = lastName.toLowerCase().trim();

              const surname = partsOfName.slice(1).join(" ");
              const email = `${firstNameEmail}.${lastNameEmail}${emailDomain}`;
              const senha = data.Senha;
              let codCliente = 0;

              if (data.Local === "HNB") {
                codCliente = 5;
              } else if (data.Local === "CMD") {
                codCliente = 4;
              } else if (data.Local === "SMA") {
                codCliente = 6;
              } else if (data.Local === "MATRIZ") {
                codCliente = 3;
              } else {
                codCliente = "";
              }

              const body = {
                TUsuario: {
                  Chave: "",
                  CodCliente: codCliente,
                  Senha: senha,
                  ConfirmaSenha: senha,
                  Email: email,
                  Nome: firstName,
                  Sobrenome: surname,
                  NomeDepartamento: data.Área,
                  NomeLocal: data.Local,
                  
                  // OBRIGATÓRIO

                  Observacao: "",
                  AdmAtivo: "N",
                  GerenteAtivo: "N",
                  OcultaUser: "N",
                  CriaUsuarioAtivo: "S",
                  AprovaChamadoAtivo: "N",
                  VipAtivo: "S",
                  VisualizaSLAContratoAtivo: "S",
                  EmailDepLocalAtivo: "N",
                  EmailSuporteAtivo: "S",
                  SatisfacaoEmailAtivo: "S",
                  SatisfacaoObrigAtivo: "N",
                  NotificaoAtivo: "N",
                  BoasVindas: "S",
                  SMSAtivo: "S",
                  GoogleAtivo: "S",
                  MicrosoftAtivo: "S",
                  AlteradPessoaisAtivo: "S",
                  MudarSenhaAtivo: "S",
                  Idioma: "pt-br",
                },
              };
 
              results.push(body);
            }
          }
        })
        .on("end", () => {
          resolve(results); // Resolve a promise com os resultados após a leitura do CSV ser concluída
        })
        .on("error", (error) => {
          reject("ERRO INTERNO", error);
        });
    });
  }

  static criarDeskManagerUser(usersReceived) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const results = [];
      try {
        let nome = "";
        let email = "";
        let senha = "";
        let area = "";
        let local = "";
  
        for (const user of usersReceived) {
          nome = user.nome;
          email = user.email;
          senha = user.senha;
          area = user.area;
          local = user.local;
        }
  
        let codCliente = Number;
          
        const codClienteRecebido = await this.formatarCodCliente(local, codCliente);
        const bodyRecebido = await this.criarBodyUsuarioDesk(codClienteRecebido, senha, email, nome, area, local);
  
        results.push(bodyRecebido);
  
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  }

}

module.exports = DeskManagerService;
