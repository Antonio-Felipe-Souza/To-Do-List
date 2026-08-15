const userService = require("../services/user.service");

async function criar(req, res, next) {
    try {
        const resultado = await userService.criar(req.body);

        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    };
}

async function listar(_req, res, next) {
    try {
        const resultado = await userService.listar();

        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    };
}

async function buscarPorId(req, res, next) {
    try {
        const resultado = await userService.buscarPorId(req.params.id);

        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    };
}

async function atualizar(req, res, next) {
    try {
        const resultado = await userService.atualizar(
            req.params.id,
            req.body
        );

        res.status(200).json(resultado);
    } catch (error) {
        next(error);;
    };
}

async function deletar(req, res, next) {
    try {
        const resultado = await userService.deletar(req.params.id);

        res.status(204).send();
    } catch (error) {
        next(error);
    };
}

async function login(req, res, next) {
    try {
        const resultado = await userService.login(req.body);

        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    };
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar,
    login
};