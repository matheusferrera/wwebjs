const express = require("express");
const mensagensController = require("../Controllers/mensagens.controller.js");

const app = express.Router();
app.use(express.json());


app.post("/enviar", mensagensController.enviarMensagem)

module.exports = app;