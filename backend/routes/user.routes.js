const express = require("express");

const router = express.Router();

router.post("/users", (req,res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Recebi o usuário!"
    });
});

module.exports = router;