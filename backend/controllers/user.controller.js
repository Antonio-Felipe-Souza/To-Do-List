const userService = require("../services/user.service");

async function criar(req,res) {
    try {
        const resultado = await userService.criar(req.body);

        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    criar
};