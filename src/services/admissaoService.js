const XlsxPopulate = require("xlsx-populate");
const csv = require("csv");
const csvParser = require("csv-parser");
const fs = require("fs");
const diacritics = require("diacritics");
const { spawn } = require("child_process");
const path = require("path");


class AdmissaoService {
  static async writeCSV(data) {
    const options = {
      delimiter: ";",
    };
    return new Promise((resolve, reject) => {
      csv.stringify(data, options, (err, output) => {
        if (err) {
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

  static async formataCPFpadrao(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, "");
    return cpfFormatado;
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
    if (local === "HNB") {
      localCode = "H";
      return localCode;
    }
    else if (local === "CMD") {
      localCode = "L";
      return localCode;
    }
    else if (local === "SMA") {
      localCode = "S";
      return localCode;
    }
    else {
      throw new Error("Local não identificado!");
    }
  }

  static async formatarLocalSenha(local, localCode) {
    if (local === "HNB") {
      localCode = "Hnb";
      return localCode;
    }
    else if (local === "CMD") {
      localCode = "Cmd";
      return localCode;
    }
    else if (local === "SMA") {
      localCode = "Sma";
      return localCode;
    }
    else {
      throw new Error("Local não identificado!");
    }
  }

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

  static async formatarTipoContrato(tipoContrato, tipoContratoCode) {
    if (tipoContrato === "CLT") {
      tipoContratoCode = "C";
      return tipoContratoCode;
    } else if (tipoContrato === "Terceiro") {
      tipoContratoCode = "X";
      return tipoContratoCode;
    } else if (tipoContrato === "Temporário") {
      tipoContratoCode = "T";
      return tipoContratoCode;
    } else if (tipoContrato === "Temporária") {
      tipoContratoCode = "T";
      return tipoContratoCode;
    } else if (tipoContrato === "Estágio") {
      tipoContratoCode = "E";
      return tipoContratoCode;
    } else if (tipoContrato === "Estagiário") {
      tipoContratoCode = "E";
      return tipoContratoCode;
    } else if (tipoContrato === "Estagiária") {
      tipoContratoCode = "E";
      return tipoContratoCode;
    } else {
      throw new Error("Local não identificado!");
    }
  }

  static async formatarAcessos(acessos) {
    const acessosSeparados = acessos.split(", ");

    const acessosSubstituidos = acessosSeparados.map(acesso => {
      if (acesso === "Blip_Desk") {
        return "Blip Desk";
      } else if (acesso === "Blip_Portal") {
        return "Blip Portal";
      } else if (acesso === "PACS - CWM") {
        return "CWM";
      } else if (acesso === "Desk_Manager") {
        return "DeskManager";
      } else if (acesso === "Conta de e-mail") {
        return "Email";
      } else if (acesso === "Neovero") {
        return "DeskManager";
      } else if (acesso === "PACS - Synapse") {
        return "Synapse";
      } else if (acesso === "MV") {
        return "Soul MV";
      } else {
        return acesso;
      }
    });

    const acessosARemover = [
      "Administrador",
      "Bird Solution (Bsprint)",
      "PACS - Mobilemed",
      "Padrão",
      "Portal Fuji",
      "Terarecon",
      "Voice",
      "Avaya ACCS Agent",
      "Avaya ACCS Supervisor",
      "Avaya Communicator (Softphone)",
      "Docusign",
      "RM",
      "PACS - Synapse 3D",
      "PACS - Vitrea",
      "NA"
    ];

    const acessoObrigatorio = "Interact";

    acessosSubstituidos.push(acessoObrigatorio);

    const acessosFormatados = acessosSubstituidos.filter(acesso => !acessosARemover.includes(acesso));

    return acessosFormatados;
  }

  static async processaPlanilhaRegistrosCSV(file) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const workbook = await XlsxPopulate.fromFileAsync(file);
        const cabecalhoRecebido = workbook.sheet(0).range("A1:S1");
        const values = cabecalhoRecebido.value();

        const expectedHeaders = [
          "Local",
          "Nome",
          "Usuario",
          "Email funcionario",
          "Senha",
          "Area",
          "Cargo",
          "Categoria",
          "CPF",
          "Tipo contrato",
          "Usuario_copia",
          "E-mail Coordenador",
          "Conselho Regional",
          "Acessos",
          "Dia admissao",
          "Mes admissao",
          "Status",
          "Data",
          "Obs",
          "FirstName",
          "LastName"
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

  static async formataPlanilhaRegistrosCSV(file) {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(file)
        .pipe(csvParser({ separator: ";" }))
        .on("data", async (data) => {

          const novaPessoa = {};

          const local = data["Local"];
          const nome = data["Nome"];
          const usuario = data["Usuario"];
          const email = data["E-mail Funcionario"];
          const senha = data["Senha"];
          const area = data["Area"];
          const cargo = data["Auxiliar de Enfermagem"];
          const categoria = data["Categoria"];
          const cpf = data["CPF"];
          const tipoContrato = data["Tipo contrato"];
          const concelhoRegional = data["Conselho Regional"];
          const acessos = data["Acessos"];
          const dataAdmissao = new Date();

          let dominioEmail = "";

          novaPessoa.local = local;
          novaPessoa.nome = nome;
          novaPessoa.usuario = usuario;
          novaPessoa.email = email;
          novaPessoa.senha = senha;
          novaPessoa.area = area;
          novaPessoa.cargo = cargo;
          novaPessoa.categoria = categoria;
          novaPessoa.cpf = cpf;
          novaPessoa.tipoContrato = tipoContrato;
          novaPessoa.concelhoRegional = concelhoRegional;
          novaPessoa.acessos = acessos;
          novaPessoa.dataAdmissao = dataAdmissao;

          if (acessos.includes("DeskManager") || acessos.includes("Email")) {
            if (acessos.includes("Email")) {
              dominioEmail = "@hnipo.org.br";
            } else {
              dominioEmail = "@desk.ms";
            }

            // Remover acentuações do nome
            const nomeSemAcentuacao = diacritics.remove(nome);

            // Separar o nome em partes
            const NomePicotado = nomeSemAcentuacao.trim().split(" ");
            const primeiroNome = NomePicotado[0].trim();
            const ultimoNome = NomePicotado[NomePicotado.length - 1].trim();

            // Criação das novas variáveis com os nomes em letras minúsculas
            const primeiroNomeEmail = primeiroNome.toLowerCase().trim();
            const ultimoNomeEmail = ultimoNome.toLowerCase().trim();

            const usuarioEmail = `${primeiroNomeEmail}.${ultimoNomeEmail}${dominioEmail}`;

            novaPessoa.usuarioEmail = usuarioEmail;
          }

          results.push(novaPessoa);
          
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject("Erro ao processar o arquivo CSV:", error);
        });
    });
  }

  static async processaPlanilha(file) {
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

  static async criarFormatacaoAcessos(file, diaAdmissao) {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(file)
        .pipe(csvParser({ separator: ";" }))
        .on("data", async (data) => {

          const novaPessoa = {};

          const nome = data["Nome do contratado"].trim();
          const area = data["Área"];
          const cpf = data["Contratados CPF"];
          const local = data["Local"];
          const admissao = diaAdmissao;
          const tipoContrato = data["Tipo de contratação"];
          const acessos = data["Quais acessos a sistemas essa pessoa precisa ter?"];

          let cpfUser = "";
          let cpfPassword = "";
          let localCode = "";
          let tipoContratoCode = "";
          let dominioEmail = "";

          if (acessos && cpf && local && admissao && tipoContrato) {
            cpfUser = await this.formatarCPFUsuario(cpf);
            cpfPassword = await this.formatarCPFSenha(cpf);
            const acessoRecebido = await this.formatarAcessos(acessos);
            const localCodeRecebido = await this.formatarLocal(local, localCode);
            const localSenhaRecebida = await this.formatarLocalSenha(local, localCode);
            const tipoContratoRecebido = await this.formatarTipoContrato(tipoContrato, tipoContratoCode);
            const cpfFormatado = await this.formataCPFpadrao(cpf);

            const usuarioFormatado = `${localCodeRecebido}${tipoContratoRecebido}${cpfUser}`;
            const senhaFormatada = `${localSenhaRecebida}@${cpfPassword}*${admissao}`;

            novaPessoa.acessos = acessoRecebido;
            novaPessoa.cpf = cpfFormatado;
            novaPessoa.dataAdmissao = admissao;
            novaPessoa.tipoContrato = tipoContrato;
            novaPessoa.nome = nome;
            novaPessoa.usuario = usuarioFormatado;
            novaPessoa.senha = senhaFormatada;
            novaPessoa.local = local;
            novaPessoa.area = area;

            if (acessoRecebido.includes("DeskManager") || acessoRecebido.includes("Email")) {
              if (acessoRecebido.includes("Email")) {
                dominioEmail = "@hnipo.org.br";
              } else {
                dominioEmail = "@desk.ms";
              }

              // Remover acentuações do nome
              const nomeSemAcentuacao = diacritics.remove(nome);

              // Separar o nome em partes
              const NomePicotado = nomeSemAcentuacao.trim().split(" ");
              const primeiroNome = NomePicotado[0].trim();
              const ultimoNome = NomePicotado[NomePicotado.length - 1].trim();

              // Criação das novas variáveis com os nomes em letras minúsculas
              const primeiroNomeEmail = primeiroNome.toLowerCase().trim();
              const ultimoNomeEmail = ultimoNome.toLowerCase().trim();

              const email = `${primeiroNomeEmail}.${ultimoNomeEmail}${dominioEmail}`;

              novaPessoa.email = email;
            }

            results.push(novaPessoa);
          }
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject("Erro ao processar o arquivo CSV:", error);
        });
    });
  }

  static async gerarDocumentoPython(name, access, email, username, password, userFromRequest) {
    return new Promise((resolve, reject) => {

      const pythonScript = path.join(__dirname, "../../python/__init__.py");

      const pythonProcess = spawn("python", [pythonScript, name, access, email, username, password, userFromRequest]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(`Saída do script Python: ${data}`);
      });

      pythonProcess.stderr.on("error", (data) => {
        console.error(`Erro do script Python: ${data}`);
      });

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          console.log("Script Python concluído com sucesso.");
          resolve();
        } else {
          reject(`Script Python retornou um código de saída não zero: ${code}`);
        }
      });
    });
  }

}



module.exports = AdmissaoService;