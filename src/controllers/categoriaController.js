import { categoriaModel } from '../models/categoriaModel.js';

const categoriaController = {

    buscarTodasCategorias: async (req, res) => {
        try {
            const resultado = await categoriaModel.selecionarTodos();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados', data: [] });
            }

            res.status(200).json({ message: 'Dados recebidos', data: resultado });
        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    buscarCategoriaPorID: async (req, res) => {
        try {
            const idCategoria = Number(req.params.idCategoria);

            if (isNaN(idCategoria) || idCategoria <= 0) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const resultado = await categoriaModel.selecionarPorId(idCategoria);

            if (!resultado) {
                return res.status(404).json({ message: 'Categoria não encontrado.' });
            }

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar categoria.', errorMessage: error.message });
        }
    },

    incluirCategoria: async (req, res) => {
        try {
            const { descricao } = req.body;

            if (!descricao) {
                return res.status(400).json({ message: 'Os dados envidos estão incorretos. Envie novamente.' });
            }

            const resultado = await categoriaModel.inserirCategoria(
                descricao.trim()
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

    atualizarCategoria: async (req, res) => {
        try {
            const idCategoria = Number(req.params.idCategoria);

            if (isNaN(idCategoria) || idCategoria <= 0) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            let { descricao } = req.body;

            const categoriaAtual = await categoriaModel.selecionarPorId(idCategoria);

            if (!categoriaAtual || categoriaAtual.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            const categoria = categoriaAtual[0];

            const novaDescricao = descricao ?? categoria.descricao_categoria;

            const resultado = await categoriaModel.atualizarCliente(
                idCategoria,
                novaDescricao
            );

            if (!resultado || resultado.affectedRows === 0) {
                return res.status(500).json({ message: 'Erro ao atualizar o Cliente.' });
            }

            return res.status(200).json({
                message: 'Cliente atualizado com sucesso.',
                data: {
                    idCategoria,
                    descricao: novaDescricao
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    excluindoCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'ID inválido. Informe um número inteiro.' });
            }

            const categoria = await categoriaModel.selecionarPorId(id);

            if (!categoria || categoria === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }

            const exclusao = await categoriaModel.deleteCategoria(id);

            if (exclusao.affectedRows === 1) {
                return res.status(200).json({ message: 'Categoria excluída com sucesso.', detalhes: exclusao });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno no servidor.', detalhes: error.message });
        }
    }
}

export { categoriaController };