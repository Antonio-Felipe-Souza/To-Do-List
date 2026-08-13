const userRepository = require("../repositories/user.repository")

async function criar(dados) {
    validarDados(dados)
    console.log("Dados que chegaram no service", dados);

    const usuarioExistente = await userRepository.buscarPorEmail(dados.email);
    if (usuarioExistente) throw new Error("Email já cadastrado");
    
    const usuario = await userRepository.criar(dados);

    return usuario;
}

function validarDados(dados) {
    const { nome, email, senha } = dados;
    const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome) throw new Error("Nome é obrigatório");
    if (nome.trim().length < 3) throw new Error("Nome deve ter no mínimo 3 caracteres válidos");
    if (!regexNome.test(nome.trim())) throw new Error("Nome de usuário contém caracteres inválidos");
    if (!email) throw new Error("Email é obrigatório");
    if (!regexEmail.test(email.trim())) throw new Error("Email inválido");
    if (!senha) throw new Error("Senha é obrigatória");
}

module.exports = {
    criar
};