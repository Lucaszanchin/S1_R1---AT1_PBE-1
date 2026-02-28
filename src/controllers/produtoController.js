import { produtoModel } from '../models/produtoModel.js';
import { categoriaModel } from '../models/categoriaModel.js';

const produtoController = {

    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados', data: [] });
            }

            res.status(200).json({ message: 'Dados recebidos', data: resultado });
        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    buscarProdutoPorID: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);

            if (isNaN(idProduto) || idProduto <= 0) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const resultado = await produtoModel.selecionarPorId(idProduto);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar produto.', errorMessage: error.message });
        }
    },

    buscarProdutoPorIdCategoria: async (req, res) => {
        try {
            const idCategoria = Number(req.params.idCategoria);

            if (isNaN(idCategoria) || idCategoria <= 0) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const resultado = await categoriaModel.selecionarPorId(idCategoria);

            if (!resultado) {
                return res.status(404).json({ message: 'categoria não encontrado.' });
            }

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar produto.', errorMessage: error.message });
        }
    },

    incluirProduto: async (req, res) => {
        try {
            const vinculoImagem = req.file ? req.file.path : null;
            const { nome, valor, categoria} = req.body;
            
            if (!nome || !valor || !categoria) {
                return res.status(400).json({ message: 'Os dados envidos estão incorretos. Envie novamente.' });
            }
            
            
            const resultado = await produtoModel.inserirProduto(
                nome.trim(), valor.trim(), categoria.trim(), vinculoImagem
            );
            
            if (resultado.affectedRows === 1 && resultado.insertId) {
                res.status(201).json({ message: 'Registro incluído com sucesso', result: resultado });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    
    atualizarProduto: async (req, res) => {
        try {
            const vinculoImagem = req.file ? req.file.path : null;
            const idProduto = Number(req.params.idProduto);
            
            if (isNaN(idProduto) || idProduto <= 0) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            let { nome, valor, categoria} = req.body;

            const produtoAtual = await produtoModel.selecionarPorId(idProduto);

            if (!produtoAtual || produtoAtual.length === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            const produto = produtoAtual[0];

            const novoNome = nome ?? produto.nomeProduto;
            const novoValor = valor ?? produto.valorProduto;
            const novaCategoria = categoria ?? produto.idCategoria;
            const novoVinculo = vinculoImagem ?? produto.vinculoImagem;

            const resultado = await produtoModel.atualizarProduto(
                idProduto,
                novoNome,
                novoValor,
                novaCategoria,
                novoVinculo
            );

            if (!resultado || resultado.affectedRows === 0) {
                return res.status(500).json({ message: 'Erro ao atualizar o Produto.' });
            }

            return res.status(200).json({
                message: 'Produto atualizado com sucesso.',
                data: {
                    idProduto,
                    nome: novoNome,
                    valor: novoValor,
                    categoria: novaCategoria,
                    vinculoImagem: novoVinculo
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    excluindoProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);

            const produto = await produtoModel.selecionarPorId(id);

            if (!produto || produto === 0) {
                return res.status(404).json({ message: 'Produto não encontrada.' });
            }

            const exclusao = await produtoModel.deleteProduto(id);

            if (exclusao.affectedRows === 1) {
                return res.status(200).json({ message: 'Produto excluído com sucesso.', detalhes: exclusao });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno no servidor.', detalhes: error.message });
        }
    },
}

export { produtoController };