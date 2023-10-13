/* eslint-disable no-undef */
const {ok} = require("assert");
const AdmissaoCsvService = require("../services/admissaoCsvService");
const path = require("path");

const planilhaCsvExpected = [
  {
    "Código da vaga": "5078062",
    "Área": "Internação - 3º Andar CD",
    "Cargo": "Escriturário",
    "Recrutador da vaga": "pamela.campos@hnipo.org.br",
    "Criador(a) da Vaga": "Natalicia Miranda Silva",
    "Email do Criador(a)": "natalicia.silva@hnipo.org.br",
    "Nome do contratado": "Nathalia Rodrigues de Santis",
    "Conselho Regional": "-",
    "Contratados CPF": "['38268391880']",
    "Tipo de contratação": "CLT",
    "No caso de substituição de pessoal, informe o colaborador a ser substituído.": "GIULIA RUIZ ARO SOARES",
    "Quais acessos a sistemas essa pessoa precisa ter?": "MV, DeskManager, Interact",
    "Coluna1": "",
    "Lista de distribuição (e-mail)": "natalicia.silva@hnipo.org.br",
    "Informar usuário para cópia do perfil": "NATALICIA.SILVA",
    "Horário de trabalho": "13 as 19",
    "Gestor": "2828",
    "Prestador": "-",
    "Local": "HNB"
  },
  {
    "Código da vaga": "5138578",
    "Área": "Internação - 3º HNB",
    "Cargo": "Continuo",
    "Recrutador da vaga": "pamela.campos@hnipo.org.br",
    "Criador(a) da Vaga": "Wanda Paredes da Rosa",
    "Email do Criador(a)": "wandaparedes@hnipo.org.br",
    "Nome do contratado": "Giovanna Alves Passos",
    "Conselho Regional": "-",
    "Contratados CPF": "['52006227866']",
    "Tipo de contratação": "CLT",
    "No caso de substituição de pessoal, informe o colaborador a ser substituído.": "Giovanna Dias de Oliveira",
    "Quais acessos a sistemas essa pessoa precisa ter?": "Interact",
    "Coluna1": "",
    "Lista de distribuição (e-mail)": "-",
    "Informar usuário para cópia do perfil": "-",
    "Horário de trabalho": "10:00-18:00",
    "Gestor": "3368",
    "Prestador": "-",
    "Local": "HNB"
  }  
];

describe("Deve receber uma planilha csv e fazer a trativa com seu devido retorno", () => {
  it("Deve receber a planilha csv", async () => {
    const csvFilePath = path.join(__dirname, "../csv/admissao2108.csv");
    const expected = planilhaCsvExpected;
    const result = await AdmissaoCsvService.processaPlanilhaCSV(csvFilePath);
    ok(result, expected);
  });
});