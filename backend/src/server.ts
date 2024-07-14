import express, { Application } from "express";
import { dbConnection } from "./config/dbConfig";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.config";

const port: number | string = process.env.PORT || 3000;
const app: Application = express();
const specs = swaggerJsdoc(swaggerOptions);

dbConnection();

// Middleware pour analyser le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

// Routes
app.use("/api/", require("./routes/index.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port : ${port}`);
  console.log(
    `Documentation swagger : \x1b[36mhttp://localhost:${port}/api-docs\x1b[0m`
  );
});
