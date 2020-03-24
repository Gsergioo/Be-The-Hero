const express = require("express");


const app = express();
app.get("/", (request, response) => {
    return response.json({
        nome: "Guilherme",
        evento: "Semana omnistack"});
});

app.listen(3333);