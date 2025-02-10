import { IApiRepository } from "../interface/ILogs.repository";
import { LogsModel } from "../models/logs.model";


export class ApiRepository implements IApiRepository {
    async createLog(data: any): Promise<any> {
        const existing = await LogsModel.findOne({car_id: data.car_id});
        if(existing) {
            return existing;
        }

        await LogsModel.create(data);
    }

    async getAllLogs(): Promise<any>{
        return await LogsModel.find();
    }
}