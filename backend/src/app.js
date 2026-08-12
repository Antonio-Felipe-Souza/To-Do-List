const express = require("express");
const app = express();
const userRoutes = require("../routes/user.routes");


app.use(express.json());
app.use(userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});

module.exports = app;