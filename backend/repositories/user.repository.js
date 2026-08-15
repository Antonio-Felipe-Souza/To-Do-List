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
        "SELECT id, nome, email, senha FROM users WHERE email = ?", [email]
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
        "SELECT id, nome, email FROM users WHERE id = ?", [id]
    );

    return usuario[0];
}

async function atualizar(id, dados) {
    const campos = [];
    const valores = [];

    if (dados.nome !== undefined) {
        campos.push("nome = ?");
        valores.push(dados.nome);
    }

    if (dados.email !== undefined) {
        campos.push("email = ?");
        valores.push(dados.email);
    }

    if (dados.senha !== undefined) {
        campos.push("senha = ?");
        valores.push(dados.senha);
    }

    if (campos.length === 0) {
        throw new AppError(
            "Informe pelo menos um campo para atualizar",
            400
        );
    }

    valores.push(id);

    const [usuario] = await pool.query(
        `UPDATE users SET ${campos.join(", ")} WHERE id = ?`, valores
    )

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