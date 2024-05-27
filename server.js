const mongoose = require("mongoose");
const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const data = require("./data/data-script.js");
const importAuthorsData = data.importAuthorsData;
const importCategoryData = data.importCategoryData;
const importPublisherData = data.importPublisherData;
const importLanguageData = data.importLanguageData;
const importBooksData =  data.importBooksData;
const importPriceData = data.importPriceData;
const updateBooksData = data.updateBooksData;

const uploadImageToVercelBlob = require("./utils/uploadImages.js")

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
})

const port = 8000;

app.listen(port, () => {
    console.log("app running")
});

// Usage example:
// const imagePath = './assets/the_hobbit.jpg'; // Replace with your image path
// uploadImageToVercelBlob(imagePath).then(response => {
//   console.log('Uploaded image response:', response);
// }).catch(error => {
//   console.error('Upload failed:', error);
// });

// importPublisherData();
// importLanguageData();
// importCategoryData();
// importAuthorsData();
// importBooksData();
// importPriceData();
// updateBooksData();
