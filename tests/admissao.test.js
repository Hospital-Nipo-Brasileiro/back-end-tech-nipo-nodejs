/* eslint-disable no-undef */
const { deepStrictEqual } = require("node:assert");
const path = require("path");
const AdmissaoController = require("../src/controllers/admissaoController");

describe('Deve fazer as validaçoes de recebimentos de uma planilha', () => {

  it('Deve receber a planilha com sucesso', async () => {
    const expected = 'Planilha nos padrões';
    const xlsxFilePath = path.join(__dirname, '../src/csv/2023-10-23_Admissões Efetivas (CLT).xlsx');
    const result = await AdmissaoController.previsualizaPlanilha(xlsxFilePath)

    deepStrictEqual(result, expected);
  })
});