const express = require("express");
const { dbConnection } = require("./config/dbConfig.js");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swagger.config");

const port = process.env.PORT || 3000;
const app = express();
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
