const userService = require("../services/user.service");

async function criar(req, res) {
    try {
        const resultado = await userService.criar(req.body);

        res.status(201).json(resultado);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    };
}

async function listar(_req, res) {
    try {
        const resultado = await userService.listar();

        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    };
}

async function buscarPorId(req, res) {
    try {
        const resultado = await userService.buscarPorId(req.params.id);

        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    };
}

async function atualizar(req, res) {
    try {
        const resultado = await userService.atualizar(
            req.params.id,
            req.body
        );

        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    };
}

async function deletar(req, res) {
    try {
        const resultado = await userService.deletar(req.params.id);

        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    };
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};