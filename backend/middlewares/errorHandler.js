function errorHandler(error, req, res, next){
    if (error.name === "ZodError") {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: error.issues
        });
    };

    res.status(error.statusCode || 500).json({
        message: error.message || "Erro interno do servidor"
    });
}

module.exports = errorHandler;