const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/users", userController.criar);
router.get("/users", userController.listar);
router.get("/users/:id", userController.buscarPorId);
router.put("/users/:id", userController.atualizar)
router.delete("/users/:id", userController.deletar)

module.exports = router;