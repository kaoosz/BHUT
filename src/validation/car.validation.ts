import { z } from "zod";
import {requiredMessage,invalidTypeMessage} from "./validation.functions";

export const carSchema = z.object({
    nome: z.string({
        required_error: requiredMessage('nome'),
        invalid_type_error: invalidTypeMessage('nome', 'string'),
    }),
    marca: z.string({
        required_error: requiredMessage('marca'),
        invalid_type_error: invalidTypeMessage('marca', 'string'),
    }),
    preco: z.number({
        required_error: requiredMessage('preco'),
        invalid_type_error: invalidTypeMessage('preco', 'number'),
    }),
    anoFabricacao: z.number({
        required_error: requiredMessage('anoFabricacao'),
        invalid_type_error: invalidTypeMessage('anoFabricacao', 'number'),
    })
});