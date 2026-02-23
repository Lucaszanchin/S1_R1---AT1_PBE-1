import pool from '../config/db.js';

const produtoModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produto';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM produto WHERE idProduto = ?';
        const [rows] = await pool.query(sql, [pId]);
        return rows;
    },

    selecionarPorIdCategoria: async (pId) => {
        const sql = 'SELECT * FROM produto WHERE idCategoria = ?';
        const [rows] = await pool.query(sql, [pId]);
        return rows;
    },

    inserirProduto: async (pNome, pValor, pImagem) => {
        const sql = `INSERT INTO produto (nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?)`;
        const [result] = await pool.query(sql, [pNome, pValor, pImagem]);
        return result;
    },

    atualizarProduto: async (pId, pNome, pValor, pImagem) => {

        const sql = `
            UPDATE produto 
            SET nomeProduto = ?, 
                valorProduto = ?, 
                vinculoImagem = ?
            WHERE idProduto = ?
        `;

        const values = [pNome, pValor, pImagem, pId];

        const [result] = await pool.query(sql, values);

        return result;
    },

    deleteProduto: async (pId) => {
        const sql = "DELETE FROM produto WHERE idProduto = ?";
        const [rows] = await pool.query(sql, [pId]);
        return rows;
    },
}

export { produtoModel };