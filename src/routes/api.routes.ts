import { Router } from 'express';
import { ApiController } from '../controller/api.controller';
import { ApiService } from '../service/api.service';
import { ApiExternalService } from '../service/api.external';
import rabbitmq from "../service/rabbitMqSingleton";
import { getEnv } from '../config/getEnv';
import { ApiRepository } from '../repository/api.repository';
import { validateCreateCar } from '../middleware/create.car';
import { getJwtFromRequest } from '../middleware/jwt';

const router = Router();

const apiExternalService = new ApiExternalService(getEnv("EXTERNAL_API_URL"));
const apiRepository = new ApiRepository();
const apiService = new ApiService(apiExternalService,apiRepository,rabbitmq);
const apiController = new ApiController(apiService);

router.post('/api/car',getJwtFromRequest, validateCreateCar, (req, res) => apiController.createApiCar(req,res));

router.get('/api/car', (req, res) => apiController.getApiCar(req,res));

router.get('/api/logs', (req, res) => apiController.getLogs(req,res));

router.post('/api/webhook', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Webhook recebido" });
});

router.get('/healthcheck', (req, res) => { res.sendStatus(200) });
export default router;
