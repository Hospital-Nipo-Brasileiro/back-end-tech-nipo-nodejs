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
