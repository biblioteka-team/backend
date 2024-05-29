import fs from "fs";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv  from "dotenv";

import Author  from "../models/authorModel.js";
import Category from "../models/categoryModel.js";
import Publisher from "../models/publisherModel.js";
import Language from "../models/languageModel.js"; 
import Book from "../models/bookModel.js";
import Price  from "../models/priceModel.js";

dotenv.config({path: "./.env"});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB  = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log("DB connection");
});

// import {author, category, publisher, language, book, price } from "";

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

const prices = JSON.parse(
    fs.readFileSync(`${__dirname}/priceData.json`, "utf-8")
);

 const importAuthorsData = async() => {
    try {
        await Author.create(authors);
        console.log("Authors loaded");
    } catch(err) {
        console.log(err);
    }
};

const importLanguageData =  async() => {
    try {
        await Language.create(languages);
        console.log("Languages loaded");
    } catch(err) {
        console.log(err);
    }
};

const importCategoryData = async() => {
    try {
        await Category.create(categories);
        console.log("Categories loaded");
    } catch(err) {
        console.log(err);
    }
};

const importPublisherData = async() => {
    try {
        await Publisher.create(publishers);
        console.log("Publishers loaded");
    } catch(err) {
        console.log(err);
    }
};

const importBooksData = async() => {
    try {
        await Book.create(books);
        console.log("Books loaded");
    } catch(err) {
        console.log(err);
    }
};

const importPriceData = async() => {
    try {
        await Price.create(prices);
        console.log("Prices loaded");
    } catch(err) {
        console.log(err);
    }
};

// const updateData = async() => {
//     try {
//         await author.insertMany(authors).then(el =>
//           book.insertMany(books.map(e =>
//             e.title = e.title,
//             e.author_id = [e._id]
//           ))
//         )
//         // await book.insertMany(books);
//         console.log("Books updated");
//     }catch(err) {
//         console.log(err);
//     }
// }

const importData = {importCategoryData, importAuthorsData, importPublisherData, importLanguageData, importBooksData, importPriceData};
export default importData;
