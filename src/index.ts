import express from "express";
import dotenv from "dotenv";
import router from "./router/index";

import { validateEnv } from "./utils/validateEnv"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import cors from "cors";

import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

dotenv.config();
validateEnv()

const app = express();
const PORT = parseInt(process.env.PORT ?? "3366" , 10);

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(session({
  genid: (req) => uuidv4(),
  secret: process.env.SESSION_SECRET ?? "Hi9Cf#mK98",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: true}

}));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
