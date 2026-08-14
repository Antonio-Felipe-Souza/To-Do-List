const pool = require("../config/database");

async function criar(dados) {
    const { nome, email, senha } = dados;

    const [resultado] = await pool.query(
        "INSERT INTO users (nome, email, senha) VALUES (?,?,?)", [nome, email, senha]
    );

    return {
        id: resultado.insertId,
        nome,
        email
    };
}

async function buscarPorEmail(email) {
    const [usuarios] = await pool.query(
        "SELECT id FROM users WHERE email = ?", [email]
    );

    return usuarios[0];
}

async function listar() {
    const [listaUsuarios] = await pool.query(
        "SELECT nome, email FROM users"
    );

    return listaUsuarios;
}

async function buscarPorId(id) {
    const [usuario] = await pool.query(
        "SELECT * FROM users WHERE id = ?", [id]
    );

    return usuario[0];
}

async function atualizar(id, dados) {
    const { nome, email, senha } = dados

    const [usuario] = await pool.query(
        "UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?", [nome, email, senha, id]
    );

    return await buscarPorId(id);
}

async function deletar(id) {
    const [usuario] = await pool.query(
        "DELETE FROM users WHERE id = ?", [id]
    );

    return usuario.affectedRows;
}

module.exports = {
    criar,
    buscarPorEmail,
    listar,
    buscarPorId,
    atualizar,
    deletar
};