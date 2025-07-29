import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import setLangCookie from './middlewares/setLangCookie';
import router from "./router/index";

import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

import { validateEnv } from "./utils/validateEnv"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import { itemCompra } from "./resources/compra/compra.types";


declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string
    carrinhoCompra: itemCompra[]
  }
}

dotenv.config();
validateEnv()

const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(express.json());

app.use(cookieParser());

app.use(setLangCookie);

app.use(session({
  
  genid: (req) => uuidv4(),
  secret: process.env.SESSION_SECRET ?? "Hi9Cf#mK98",
  resave: true,
  saveUninitialized: true

}));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
