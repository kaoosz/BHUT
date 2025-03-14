import { getEnv } from "../config/getEnv";
import { createCarDTO } from "../dto/car.dto";
import { ApiRepository } from "../repository/api.repository";
import { ApiExternalService } from "./api.external";
import { Rabbitmq } from "./rabbit.service";

const QUEUE = getEnv("QUEUE");

export class ApiService {

    constructor(
        private apiExternal: ApiExternalService,
        private api: ApiRepository,
        private rabbitmq: Rabbitmq
    ){}

    async create(createCarDto: createCarDTO,token: string): Promise<any>{

        const externalCall = await this.apiExternal.createCar(createCarDto,token);

        await this.rabbitmq.publisheInQueue(QUEUE,JSON.stringify({
            data_hora_criacao: new Date(),
            car_id: externalCall.id,
        }));

        return externalCall;
    }

    async getCar(token: string,ativo: boolean = true,pagina: string = "1",tamanhoPagina: string = "2"): Promise<any>{

        const externalCall = await this.apiExternal.getCars(token,ativo,pagina,tamanhoPagina);
        return externalCall;
    }

    async getLogs(): Promise<any>{
        const externalCall = await this.api.getAllLogs();
        return externalCall;
    }
}