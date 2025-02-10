import { Request, Response } from "express";
import { createCarDTO } from "../dto/car.dto";
import { ApiService } from "../service/api.service";


export class ApiController {

    constructor(private apiService: ApiService){}

    async createApiCar(req:Request, res: Response): Promise<void> {
        
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(400).json({ error: "Token not provided." });
                return;
            }

            const createCarDto: createCarDTO = req.body;
            const result = await this.apiService.create(createCarDto,token);
            
            res.status(200).json(result);
        } catch (error:any) {
            const status = error.response ? error.response.status : 500;
            const data = error.response ? error.response.data : { message: "Internal server error" };
            res.status(status).json(data)
        }
    }

    async getApiCar(req:Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization;

            if (!token) {
                res.status(400).json({ error: "Token not provided." });
                return;
            }
            const car = await this.apiService.getCar(token);
            res.status(200).json(car);
        } catch (error:any) {
            const status = error.response ? error.response.status : 500;
            const data = error.response ? error.response.data : { message: "Internal server error" };
            res.status(status).json(data);
        }
    }

    async getLogs(req:Request, res: Response): Promise<void> {
        try {
            const logs =  await this.apiService.getLogs();
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}