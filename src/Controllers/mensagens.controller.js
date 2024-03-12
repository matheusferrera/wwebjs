const mensagensRepository = require("../Repositories/mensagens.repository.js");


async function enviarMensagem(req, res) {
    try {
        const data = await mensagensRepository.enviarMensagem();
        res.send(data);
    } catch(err) {
        res.send(err);
    }
}


module.exports = { enviarMensagem }

