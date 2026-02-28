import pool from '../config/db.js';

export const categoriaModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM categoria';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (idCategoria) => {
        const sql = 'SELECT * FROM categoria WHERE idCategoria = ?';
        const [rows] = await pool.query(sql, [idCategoria]);
        return rows;
    },

    inserirCategoria: async (descricaoCategoria) => {
        const sql = 'INSERT INTO categoria (descricaoCategoria) VALUES (?)';
        const [result] = await pool.query(sql, [descricaoCategoria]);
        return result;
    },

    atualizarCategoria: async (idCategoria, descricaoCategoria) => {
        const sql = `UPDATE categoria SET descricaoCategoria = ? WHERE idCategoria = ?`;
        const [result] = await pool.query(sql, [descricaoCategoria, idCategoria]);
        return result;
    },

    deleteCategoria: async (idCategoria) => {
        const sql = 'DELETE FROM categoria WHERE idCategoria = ?';
        const [result] = await pool.query(sql, [idCategoria]);
        return result;
    }
};