const db = require("../models");

class PessoaService {
  static async buscaSistemaPorPessoa() {
    try {
      const resultado = await db.sequelize.query(`
      SELECT 
        TN_T_PESSOA.id AS ID,
        TN_T_PESSOA.ds_nome AS NOME,
        COALESCE(STRING_AGG(TN_T_SISTEMA.ds_nome, ', '), '') AS SISTEMAS
      FROM TN_T_PESSOA
        LEFT JOIN TN_T_SISTEMA_PESSOA ON TN_T_SISTEMA_PESSOA.id_pessoa = TN_T_PESSOA.id
        LEFT JOIN TN_T_SISTEMA ON TN_T_SISTEMA.id = TN_T_SISTEMA_PESSOA.id_sistema
      WHERE 
        COALESCE(TN_T_SISTEMA_PESSOA.dt_deleted, TN_T_SISTEMA.dt_deleted) IS NULL
      GROUP BY TN_T_PESSOA.id, TN_T_PESSOA.ds_nome

      `);

      return resultado;
    } catch (err) {
      throw new Error("Erro ao realizar busca de sistema por pessoa ", err);
    }
  } 
}

module.exports = PessoaService;