const db = require("../models");

class LoginService {
  static async buscaPessoaPorLogin(loginId) {
    try {
      const resultado = await db.sequelize.query(`
        SELECT
            TN_T_LOGIN.id AS ID,
            TN_T_LOGIN.ds_username as USUARIO,
            TN_T_LOGIN.ds_email as EMAIL,
            TN_T_PESSOA.ds_nome AS NOME,
            TN_T_PESSOA.nr_cpf AS CPF,
            TN_T_PESSOA.dt_admissao AS ADMISSAO,
            TN_T_PESSOA.dt_nascimento AS NASCIMENTO,
            TN_T_PESSOA.tp_contrato AS TIPO_DE_CONTRATO,
            TN_T_PESSOA.ds_categoria_cargo AS CATEGORIA,
            TN_T_SETOR.ds_nome AS SETOR,
            TN_T_CARGO.ds_nome as CARGO
        FROM TN_T_LOGIN
            JOIN TN_T_PESSOA ON TN_T_LOGIN.id_pessoa = TN_T_PESSOA.id
                LEFT JOIN TN_T_PESSOA_CARGO ON TN_T_PESSOA_CARGO.id_pessoa = TN_T_PESSOA.id
            LEFT JOIN TN_T_CARGO_SETOR ON TN_T_CARGO_SETOR.id = TN_T_PESSOA_CARGO.id_cargo_setor
                LEFT JOIN TN_T_SETOR ON TN_T_SETOR.id = TN_T_CARGO_SETOR.id_setor
            LEFT JOIN TN_T_CARGO ON TN_T_CARGO.id = TN_T_CARGO_SETOR.id_cargo
            WHERE
                TN_T_LOGIN.id = ${loginId}
            AND TN_T_PESSOA.dt_deleted IS NULL
          AND TN_T_CARGO_SETOR.dt_deleted IS NULL
          AND TN_T_CARGO_SETOR.dt_deleted IS NULL
          AND TN_T_SETOR.dt_deleted IS NULL
          AND TN_T_CARGO.dt_deleted IS NULL
        
            GROUP BY
                TN_T_LOGIN.id,
                TN_T_LOGIN.ds_username,
                TN_T_LOGIN.ds_email,
                TN_T_PESSOA.ds_nome,
                TN_T_PESSOA.nr_cpf,
                TN_T_PESSOA.dt_admissao,
                TN_T_PESSOA.dt_nascimento,
                TN_T_PESSOA.tp_contrato,
                TN_T_PESSOA.ds_categoria_cargo,
                TN_T_SETOR.ds_nome,
                TN_T_CARGO.ds_nome
        `);

      return resultado;
    } catch (err) {
      throw new Error("Erro ao realizar busca");
    }
  }
}

module.exports = LoginService;