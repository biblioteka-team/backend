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
import Storagedata from "../models/storagedataModel.js";
import Genre from "../models/genreModel.js";
import Cover from "../models/coverModel.js";
import Age from "../models/ageModel.js";

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

const genres = JSON.parse(
    fs.readFileSync(`${__dirname}/genreData.json`, "utf-8")
);

const storageData = JSON.parse(
    fs.readFileSync(`${__dirname}/storageData.json`, "utf-8")
);

const covers= JSON.parse(
    fs.readFileSync(`${__dirname}/coverData.json`, "utf-8")
);

const ages= JSON.parse(
    fs.readFileSync(`${__dirname}/ageData.json`, "utf-8")
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

const importStorageData = async() => {
    try {
        await Storagedata.create(storageData);
        console.log("Storagedata loaded");
    } catch(err) {
        console.log(err);
    }
};

const importGenreData = async() => {
    try {
        await Genre.create(genres);
        console.log("Genres loaded");
    } catch(err) {
        console.log(err);
    }
};

const importCoverData = async() => {
    try {
        await Cover.create(covers);
        console.log("Covers loaded");
    } catch(err) {
        console.log(err);
    }
};

const importAgesData = async() => {
    try {
        await Age.create(ages);
        console.log("Ages loaded");
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

const importData = {importCategoryData, importAuthorsData, 
                    importPublisherData, importLanguageData, 
                    importBooksData, importPriceData, importStorageData,
                    importGenreData, importCoverData, importAgesData};
export default importData;
