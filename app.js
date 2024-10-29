import express from "express";
import morgan from "morgan";
import cors from "cors";
import { admin, adminRouter } from "./services/adminService.js";

import handler from "./utils/uploadImagesHandler.js";
import bookRouter from "./routes/bookRouter.js";
import authRouter from "./routes/authRouter.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
    },
    servers: [
      {
        api: "http://localhost:8080",
      },
    ],
  },
  apis: ["./documentation/**/*.js"],
};

const corsOptions = {
  source: "/api/(.*)",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    {
      key: "Access-Control-Allow-Methods",
      value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    },
    {
      key: "Access-Control-Allow-Headers",
      value:
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  ],
  origin: ["http://localhost:5173", "https://biblioteka-db.netlify.app"],
  optionsSuccessStatus: 200,
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocs)
);

app.use(cors(corsOptions));

app.use(admin.options.rootPath, adminRouter);

//test
app.use(express.json());

app.use("/api", bookRouter);
app.use("/", authRouter);

export default app;
