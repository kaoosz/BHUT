import axios, { AxiosInstance } from "axios"
import { createCarDTO } from "../dto/car.dto";

export class ApiExternalService {

    private client: AxiosInstance;

    constructor(private baseURL: string) {
        this.client = axios.create({ baseURL });
    }

    async getCars(token: string,ativo: boolean,pagina: string,tamanhoPagina: string): Promise<any>{
        
        try {

            const response = await this.client.get(`/v1/carro?ativo=${ativo}&pagina=${pagina}&tamanhoPagina=${tamanhoPagina}`,{
                headers: { Authorization: token},
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createCar(data: createCarDTO,token: string): Promise<any>{
        try {

            const response = await this.client.post("/v1/carro",data,{
                headers: { Authorization: token},
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}