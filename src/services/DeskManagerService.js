const fs = require("fs");
const csv = require("csv-parser");

class DeskManagerService {

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

              const partsOfName = data.Nome.split(" ");
              const firstName = partsOfName[0];
              const lastName = partsOfName[partsOfName.length - 1];
              const surname = partsOfName.slice(1).join(" ");
              const email = `${firstName}.${lastName}${emailDomain}`;
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
                  // Restante da lógica...
                },
              };

              results.push(body);
            }
          }
        })
        .on("end", () => {
          console.log("Criação de usuários concluída.");
          resolve(results); // Resolve a promise com os resultados após a leitura do CSV ser concluída
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

}

module.exports = DeskManagerService;
