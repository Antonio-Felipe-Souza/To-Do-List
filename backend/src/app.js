const express = require("express");
const app = express();

const userRoutes = require("../routes/user.routes");
const errorHandler = require("../middlewares/errorHandler");


app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});

module.exports = app;