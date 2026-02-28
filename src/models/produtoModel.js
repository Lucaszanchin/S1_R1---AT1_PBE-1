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

    inserirProduto: async (pNome, pValor, pIdCategoria, pImagem) => {
        const sql = `INSERT INTO produto (nomeProduto, valorProduto, idCategoria, vinculoImagem) VALUES (?,?,?,?)`;
        const [result] = await pool.query(sql, [pNome, pValor, pIdCategoria, pImagem]);
        return result;
    },

    atualizarProduto: async (pId, pNome, pValor, pIdCategoria, pImagem) => {
        const sql = `UPDATE produto SET nomeProduto = ?, valorProduto = ?, idCategoria = ?, vinculoImagem = ? WHERE idProduto = ?`;
        const values = [pNome, pValor, pIdCategoria, pImagem, pId];
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