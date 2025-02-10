import { getEnv } from "../config/getEnv";
import { Rabbitmq } from "./rabbit.service"

const RABBIT_URL = getEnv("RABBIT_URL");
const rabbitInstance = new Rabbitmq(RABBIT_URL);

export async function initRabbitMQ(){
    await rabbitInstance.start();
    return rabbitInstance;
}

export default rabbitInstance;