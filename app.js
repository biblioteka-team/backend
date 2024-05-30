import express from "express";
import morgan  from "morgan";
// import AdminJS from "adminjs";
// import AdminJSExpress from "@adminjs/express";
// import {  Database, Resource } from "@adminjs/mongoose";


import Book from "./models/bookModel.js";
import Author from "./models/authorModel.js";
import Price from "./models/priceModel.js";
import Publisher from "./models/publisherModel.js";
import Category from "./models/categoryModel.js";
import Language from "./models/languageModel.js";
// import Address from "./models/addressModel.js";
// import Availability from "./models/availabilityModel.js";

import handler from "./utils/uploadImagesHandler.js";
import router from "./routes/bookRouter.js";

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

//admin panel
// AdminJS.registerAdapter({ Database, Resource });

// const admin = new AdminJS({
//     resources: [
//         {
//             resource: Author,
//         },
//         {
//             resource: Book,
//         },
//         {
//             resource: Price,
//         },
//         {
//             resource: Publisher,
//         },
//         {
//             resource: Language,
//         },
//         {
//             resource: Category,
//         }
//     ],
//     rootPath: "/admin", 
// });

// const adminRouter = AdminJSExpress.buildRouter(admin);
// app.use(admin.options.rootPath, adminRouter);

//test
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