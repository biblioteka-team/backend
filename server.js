import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import app  from "./app.js";
import multer from "multer";
import dotenv from "dotenv" ;
dotenv.config({path: "./.env"});


import importData from "./data/data-script.js";

// const uploadImageHandler = require("./utils/uploadImagesHandler.js")

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
})

// const admin = new AdminJS({
//     databases: [], // We don’t have any resources connected yet.
//     rootPath: "/admin", 
// });

// const router = AdminJSExpress.buildRouter(admin);
// app.use(admin.options.rootPath, router);

const port = 8000;

app.listen(port, () => {
    console.log("app running")
});


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('image'), uploadImageHandler);
// Usage example:
// const imagePath = './assets/ulysses.jpg'; // Replace with your image path
// uploadImageToVercelBlob(imagePath).then(response => {
//   console.log('Uploaded image response:', response);
// }).catch(error => {
//   console.error('Upload failed:', error);
// });



// updateData();
