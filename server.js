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


const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
})

const port = 3000;

app.listen(port, () => {
    console.log("app running")
});



// importPublisherData();
// importLanguageData();
// importCategoryData();
// importAuthorsData();
importBooksData();