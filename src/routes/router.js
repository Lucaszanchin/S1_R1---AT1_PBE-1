import express from 'express';
import { categoriaRoutes } from './categoriaRoute.js';
import { produtoRoutes } from './produtoRoute.js';

const router = express.Router();

router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);

export { router };