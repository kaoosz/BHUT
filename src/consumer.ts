import { ApiRepository } from "./repository/api.repository";
import { Rabbitmq } from "./service/rabbit.service";
import dotenv from 'dotenv';
import axios from 'axios';
import { getEnv } from './config/getEnv';
import DataBase from "./db/database";

dotenv.config();

const RABBIT_URL = getEnv("RABBIT_URL");
const WEBHOOK_URL = getEnv("WEBHOOK_URL");
const QUEUE = getEnv("QUEUE");

async function startConsumer(){

    const db = DataBase.getInstance();
    await db.connect();
    
    const rabbit = new Rabbitmq(RABBIT_URL);
    await rabbit.start();

    const logsRepository = new ApiRepository();

    await rabbit.consumeQueue(QUEUE, async (msg) => {
      
      if(!msg)return;

      let message;
      try {
        
        message = JSON.parse(msg.content.toString());
        console.log("Mensagem recebida:", JSON.parse(msg.content.toString()));

      } catch (parseError) {
        console.error("Erro ao parsear a mensagem:", parseError);
        rabbit.channel.nack(msg,false,false);
        return;
      }

      let webhookSuccess = false;

      try {

        const webhookURL = WEBHOOK_URL;
        await axios.post(webhookURL, "Um novo carro foi cadastrado");
        console.log("Webhook enviado com sucesso.");
        webhookSuccess = true;

      } catch (error) {
        console.log("error send web hook",error);
      }

      let logSuccess = false;

      try {

        const data = {
          data_hora_criacao: message.message,
          data_hora_processamento: new Date(),
          car_id: message.car_id
        }

        await logsRepository.createLog(data);
        logSuccess = true;
        console.log("Log Salvo");
      } catch (error) {
        console.log("ERROR createLOG DB",error );
      }

      if(webhookSuccess && logSuccess) {
        rabbit.channel.ack(msg);
      }else {
        rabbit.channel.nack(msg, false, true);
      }
    });
}

startConsumer().catch(console.error);
