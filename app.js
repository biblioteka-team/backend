import express from "express";
import morgan  from "morgan";
import handler from "./utils/uploadImagesHandler.js";

import router from "./routes/bookRouter.js";

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

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