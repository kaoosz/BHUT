import express from 'express';
import api from "./routes/api.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);