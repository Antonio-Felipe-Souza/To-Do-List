const userRepository = require("../repositories/user.repository")
const AppError = require("../errors/AppError");

async function criar(dados) {
    validarDados(dados)
    console.log("Dados que chegaram no service", dados);

    const usuarioExistente = await userRepository.buscarPorEmail(dados.email);
    if (usuarioExistente) throw new AppError("Email já cadastrado", 409);

    const usuario = await userRepository.criar(dados);

    return usuario;
}

function validarDados(dados) {
    const { nome, email, senha } = dados;
    const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome) throw new AppError("Nome é obrigatório", 400);
    if (nome.trim().length < 3) throw new AppError("Nome deve ter no mínimo 3 caracteres válidos", 400);
    if (!regexNome.test(nome.trim())) throw new AppError("Nome de usuário contém caracteres inválidos", 400);
    if (!email) throw new AppError("Email é obrigatório", 400);
    if (!regexEmail.test(email.trim())) throw new AppError("Email inválido", 400);
    if (!senha) throw new AppError("Senha é obrigatória", 400);
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
    validarDados(dados)

    const usuario = await buscarPorId(id);
        
    const usuarioAtualizado = await userRepository.atualizar(id,dados);

    return usuarioAtualizado;
}

async function deletar(id) {
    const usuario = await buscarPorId(id);

    const usuarioDeletado = await userRepository.deletar(id);
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};