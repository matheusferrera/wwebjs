const qrcode = require('qrcode-terminal');
const {  Client, LocalAuth } = require('whatsapp-web.js');
const express = require("express")
const cors = require("cors")
const routerMensagens = require("./Routers/mensagens.router.js")


const app = express()
app.use(express.json())
app.use(cors())






app.use("/teste", () => {console.log("TESTANDO")})
app.use("/mensagens", routerMensagens)


app.listen(3000, async () => { //Criacao do arquivo para armazenar dados
    try {
        console.log("===========> SERVIDOR LIGADO - ", new Date, " <===========")
                
        const client = new Client({
          authStrategy: new LocalAuth({ clientId: 'client-3' })
        });

        client.initialize();

        client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });
        
        client.on('ready', async() => {
          const labels = await client.getLabels()
          console.log("LABELS -> ", labels)
          console.log('Client is ready!');
        });

        client.on('authenticated', () => {
          console.log('Client is auth!');
        });

        client.on('auth_failure', () => {
          console.log('Client auth fail!');
        });


        client.on('message', async(msg) => {  
          
          if (msg.body == '!ping') {
              msg.reply('pong');
          }
          });

    } catch(err){
        console.log(err)
    }
    
})

