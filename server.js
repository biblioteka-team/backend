import mongoose from "mongoose";
import app  from "./app.js";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv" ;
dotenv.config({path: "./.env"});
import { sortingFormFields } from "./services/formService.js";
// import data from "./data/data-script.js";
// const importCoversData = data.importCoverData;
// const importGenreData = data.importGenreData;
// const importLanguagesData = data.importLanguageData;
// const importPublishersData = data.importPublisherData
// const importCategotyData = data. importCategoryData
// const importPrice = data.importPriceData
// const importBookData = data.importBooksData
// importBookData()





// const uploadImageHandler = require("./utils/uploadImagesHandler.js")

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
});

const port = 8080;

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
