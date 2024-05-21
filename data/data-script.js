const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dataBase = require("../models");

dotenv.config({path: "./.env"});

const DB  = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log("DB connection");
});

const {author, category, publisher, language, book } = dataBase;

const authors = JSON.parse(
    fs.readFileSync(`${__dirname}/authorData.json`, "utf-8")
);
const categories = JSON.parse(
    fs.readFileSync(`${__dirname}/categoryData.json`, "utf-8")
);

const languages = JSON.parse(
    fs.readFileSync(`${__dirname}/languageData.json`, "utf-8")
);

const publishers =  JSON.parse(
    fs.readFileSync(`${__dirname}/publisherData.json`, "utf-8")
);

const books = JSON.parse(
    fs.readFileSync(`${__dirname}/bookData.json`, "utf-8")
);

const importAuthorsData = async() => {
    try {
        await author.create(authors);
        console.log("Authors loaded");
    } catch(err) {
        console.log(err);
    }
};

const importLanguageData =  async() => {
    try {
        await language.create(languages);
        console.log("Languages loaded");
    } catch(err) {
        console.log(err);
    }
};

const importCategoryData = async() => {
    try {
        await category.create(categories);
        console.log("Categories loaded");
    } catch(err) {
        console.log(err);
    }
};

const importPublisherData = async() => {
    try {
        await publisher.create(publishers);
        console.log("Publishers loaded");
    } catch(err) {
        console.log(err);
    }
};

const importBooksData = async() => {
    try {
        await book.create(books);
        console.log("Books loaded");
    } catch(err) {
        console.log(err);
    }
};

const updateBooksData = async() => {
    try {
        await book.insertMany(books);
        console.log("Books updated");
    }catch(err) {
        console.log(err);
    }
}

 module.exports = { importCategoryData, importAuthorsData, importPublisherData, importLanguageData, importBooksData, updateBooksData};
