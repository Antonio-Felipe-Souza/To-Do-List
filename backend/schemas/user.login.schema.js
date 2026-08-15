const { z, email } = require("zod");

const userLoginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(1, "Senha é obrigatória")
});

module.exports = userLoginSchema;