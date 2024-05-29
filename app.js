import express from "express";
import morgan  from "morgan";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import handler from "./utils/uploadImagesHandler.js";

import router from "./routes/bookRouter.js";

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

const admin = new AdminJS({
    databases: [], // We don’t have any resources connected yet.
    rootPath: "/admin", 
});

const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);


app.use(express.json());

app.get("/", router);
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.post('/upload', async (_req) => {
    const request = _req;
    await handler(request);
})


export default app; 