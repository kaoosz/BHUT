import { app } from './app';
import DataBase from './db/database';
import { getEnv } from './config/getEnv';
import { initRabbitMQ } from './service/rabbitMqSingleton';
import dotenv from 'dotenv';
dotenv.config();

const PORT = getEnv("PORT", "3001");

async function bootstrap() {

  try {
    
    const db = DataBase.getInstance();
    await db.connect();
    await initRabbitMQ();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start application', error);
  }
}

bootstrap();
