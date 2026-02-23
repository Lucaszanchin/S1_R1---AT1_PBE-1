import express from 'express';
import { produtoController } from '../controllers/produtoController.js';
import uploadImage from "../middlewares/uploadImage.middleware.js";

const produtoRoutes = express.Router();

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoPorID);
produtoRoutes.post('/produtos', uploadImage, produtoController.incluirProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluindoProduto);
produtoRoutes.post('/produtos/images', uploadImage, produtoController.upload);

export { produtoRoutes };