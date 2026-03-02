import express from 'express';
import { produtoController } from '../controllers/produtoController.js';
import uploadImage from "../middlewares/uploadImage.middleware.js";

const produtoRoutes = express.Router();

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoPorID);
produtoRoutes.get('/categorias/:idCategoria/produtos', produtoController.buscarProdutoPorCategoria);
produtoRoutes.post('/produtos', uploadImage, produtoController.incluirProduto);
produtoRoutes.put('/produtos/:idProduto', uploadImage, produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluindoProduto);


export { produtoRoutes };