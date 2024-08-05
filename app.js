import express from "express";
import morgan  from "morgan";
import cors from "cors";
// import { admin, adminRouter } from "./services/adminService.js";

import handler from "./utils/uploadImagesHandler.js";
import bookRouter from "./routes/bookRouter.js";

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

const corsOptions = {
    source: "/api/(.*)",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
          { "key": "Access-Control-Allow-Credentials", "value": "true" },
          { "key": "Access-Control-Allow-Origin", "value": "*" },
          { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
        origin: ["http://localhost:5173", "https://frontend-sigma-three-18.vercel.app/api"],
        optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(admin.options.rootPath, adminRouter);

//test
app.use(express.json());

app.use("/api", bookRouter);

export default app; 