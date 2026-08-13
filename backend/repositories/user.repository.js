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

module.exports = {
    criar,
    buscarPorEmail
};