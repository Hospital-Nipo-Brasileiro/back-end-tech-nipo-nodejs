const db = require("../models");

class ItemGuardadoService {
  static async buscaItensPorEstoque(estoqueId) {
    // eslint-disable-next-line no-useless-catch
    try {
      const resultado = await db.sequelize.query(`
        SELECT 
            TN_T_ESTOQUE.id, 
            TN_T_ESTOQUE.ds_nome AS ESTOQUE, 
            TN_T_ZONA.ds_nome AS ZONA,
            TN_T_BAU.ds_nome AS BAU,
            NULL AS ARMARIO,
            NULL AS PRATELEIRA,
            TN_T_ITEM.ds_nome AS ITEM,
            TN_T_ITEM.ds_modelo AS MODELO,
            TN_T_ITEM.ds_item AS DESCRICAO,
            SUM(TN_T_ITEM_GUARDADO.qt_item) AS QT_ITEM
        FROM TN_T_ESTOQUE
        
            JOIN TN_T_ZONA ON TN_T_ZONA.id_estoque = TN_T_ESTOQUE.id
                JOIN TN_T_BAU ON TN_T_BAU.id_zona = TN_T_ZONA.id
                JOIN TN_T_ITEM_GUARDADO ON TN_T_ITEM_GUARDADO.id_bau = TN_T_BAU.id
                JOIN TN_T_ITEM ON TN_T_ITEM.id = TN_T_ITEM_GUARDADO.id_item
            WHERE 
                TN_T_ESTOQUE.id = ${estoqueId} 
            AND TN_T_ZONA.dt_deleted IS NULL 
            AND TN_T_BAU.dt_deleted IS NULL 
            AND TN_T_ITEM_GUARDADO.dt_deleted IS NULL
        
            GROUP BY
                TN_T_ESTOQUE.id, 
                TN_T_ESTOQUE.ds_nome, 
                TN_T_ZONA.ds_nome, 
                TN_T_BAU.ds_nome,
                TN_T_ITEM.ds_nome,
                TN_T_ITEM.ds_modelo,
                TN_T_ITEM.ds_item
          
        UNION
        
            SELECT 
            TN_T_ESTOQUE.id, 
            TN_T_ESTOQUE.ds_nome, 
            TN_T_ZONA.ds_nome, 
            NULL, 
            TN_T_ARMARIO.ds_nome,
            TN_T_PRATELEIRA.ds_nome,
            TN_T_ITEM.ds_nome AS ITEM,
            TN_T_ITEM.ds_modelo AS MODELO,
            TN_T_ITEM.ds_item AS DESCRICAO,
            SUM(TN_T_ITEM_GUARDADO.qt_item) AS QT_ITEM
        FROM TN_T_ESTOQUE
        
            JOIN TN_T_ZONA ON TN_T_ZONA.id_estoque = TN_T_ESTOQUE.id
                JOIN TN_T_ARMARIO ON TN_T_ARMARIO.id_zona = TN_T_ZONA.id
                JOIN TN_T_PRATELEIRA ON TN_T_PRATELEIRA.id_armario = TN_T_ARMARIO.id
                JOIN TN_T_ITEM_GUARDADO ON TN_T_ITEM_GUARDADO.id_prateleira = TN_T_PRATELEIRA.id
                JOIN TN_T_ITEM ON TN_T_ITEM.id = TN_T_ITEM_GUARDADO.id_item
            WHERE 
                TN_T_ESTOQUE.id = ${estoqueId} 
            AND TN_T_ZONA.dt_deleted IS NULL 
            AND TN_T_ARMARIO.dt_deleted IS NULL 
            AND TN_T_PRATELEIRA.dt_deleted IS NULL
            AND TN_T_ITEM_GUARDADO.dt_deleted IS NULL
        
            GROUP BY
                TN_T_ESTOQUE.id, 
                TN_T_ESTOQUE.ds_nome, 
                TN_T_ZONA.ds_nome, 
                TN_T_ARMARIO.ds_nome,
                TN_T_PRATELEIRA.ds_nome,
                TN_T_ITEM.ds_nome,
                TN_T_ITEM.ds_modelo,
                TN_T_ITEM.ds_item;
          `,  
      {
        replacements: { estoqueId }, // Define o valor do parâmetro aqui
        type: db.sequelize.QueryTypes.SELECT,
      });
      return resultado;
      
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = ItemGuardadoService;