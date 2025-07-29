import express from "express";
import dotenv from "dotenv";
import router from "./router/index";

import { validateEnv } from "./utils/validateEnv"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import cors from "cors";



dotenv.config();
validateEnv()

const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(cors());
app.use(express.json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
