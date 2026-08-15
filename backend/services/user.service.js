const userRepository = require("../repositories/user.repository")
const AppError = require("../errors/AppError");
const userCreateSchema = require("../schemas/user.creat.schema");
const userUpdateSchema = require("../schemas/user.update.schema");
const bcrypt = require("bcrypt");
const userLoginSchema = require("../schemas/user.login.schema");
const jwt = require("jsonwebtoken");
const { email } = require("zod");

async function criar(dados) {
    const dadosValidadosZod = userCreateSchema.parse(dados);

    const usuarioExistente = await userRepository.buscarPorEmail(dadosValidadosZod.email);
    if (usuarioExistente) throw new AppError("Email já cadastrado", 409);

    const senhaHash = await bcrypt.hash(dadosValidadosZod.senha, 10);

    const dadosUsuario = {
        ...dadosValidadosZod,
        senha: senhaHash
    };

    const usuario = await userRepository.criar(dadosUsuario);

    return usuario;
}

async function listar() {
    const listaUsuarios = await userRepository.listar();

    return listaUsuarios;
}

async function buscarPorId(id) {
    const usuario = await userRepository.buscarPorId(id);

    if (!usuario) throw new AppError("Usuário não encontrado", 404);

    return usuario;
}

async function atualizar(id, dados) {
    const dadosValidadosZod = userUpdateSchema.parse(dados);

    const usuario = await buscarPorId(id);

    const dadosUsuario = {
        ...dadosValidadosZod
    };

    if (dadosUsuario.senha !== undefined) {
        dadosUsuario.senha = await bcrypt.hash(dadosUsuario.senha, 10);
    };

    const usuarioAtualizado = await userRepository.atualizar(id, dadosUsuario);

    return {
        message: "Usuário atualizado com sucesso",
        usuario: usuarioAtualizado
    };
}

async function deletar(id) {
    const usuario = await buscarPorId(id);

    const usuarioDeletado = await userRepository.deletar(id);
}

async function login(dados) {
    const dadosValidadosZod = userLoginSchema.parse(dados);

    const usuarioBanco = await userRepository.buscarPorEmail(dadosValidadosZod.email);

    if (!usuarioBanco) throw new AppError("Email ou senha inválidos", 401);

    const senhaValida = await bcrypt.compare(
        dadosValidadosZod.senha,
        usuarioBanco.senha
    );

    if (!senhaValida) throw new AppError("Email ou senha inválidos", 401);

    const token = jwt.sign(
        {
            id: usuarioBanco.id,
            email: usuarioBanco.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "1h"
        }
    );

    return {
        message: "Login realizado com sucesso!",
        token
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