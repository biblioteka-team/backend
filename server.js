import mongoose from "mongoose";
import app  from "./app.js";
import cors from "cors";
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
});

// Use CORS middleware
const corsOptions = {
    origin: "https://frontend-sigma-three-18.vercel.app/",
    optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

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
