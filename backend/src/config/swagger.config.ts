import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger FreeLens - OpenAPI 3.0.0",
      version: "1.0.0",
      description:
        "API documentation for FreeLens, a personal project by Yelhie for a fictional freelance photography agency. <br>This documentation provides details on all the available endpoints and how to interact with them. <br> <br>My github : [https://github.com/Yelhie](https://github.com/Yelhie) ",
      contact: {
        name: "Yelhie",
        url: "https://github.com/Yelhie",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
