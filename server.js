import mongoose from "mongoose";
import app  from "./app.js";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv" ;
dotenv.config({path: "./.env"});

// import data from "./data/data-script.js";
// const importStorageData =  data.importStorageData;

// const uploadImageHandler = require("./utils/uploadImagesHandler.js")

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
});

const port = 8000;

app.listen(port, () => {
    console.log("app running")
});

// importStorageData();
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
