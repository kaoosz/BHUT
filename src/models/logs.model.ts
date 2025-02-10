import mongoose, { Schema,Document } from "mongoose";


export interface ILog extends Document {
    data_hora_criacao: Date;
    data_hora_processamento: Date;
    car_id: string;
}
  
const LogSchema: Schema = new Schema({
    data_hora_criacao: { type: Date, required: true, default: Date.now },
    data_hora_processamento: { type: Date, required: true },
    car_id: { type: String, required: true, unique: true },
});

export const LogsModel = mongoose.model<ILog>("Log",LogSchema);