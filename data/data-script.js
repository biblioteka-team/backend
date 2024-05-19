const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dataBase = require("../models");
// const { title } = require("process");

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

console.log(books)
const importBooksData = async() => {
    try {
    //    const bookAdded = new book({
    //         title: title,
    //         author_id: author._id,
    //         publisher_id: publisher._id,
    //         pagesQty,
    //         language_id: language._id,
    //         summary,
    //         coverImageLink,
    //         isbn,
    //         category_id: category._id,
    //         publication_year,
    //         type,
    //         condition,
    //         title_ukr,
    //         summary_ukr,
    //         coverImageLink_ukr,
    //         created
    //     });
        await book.create(books);

        console.log("Books loaded");
    } catch(err) {
        console.log(err);
    }
};

 module.exports = { importCategoryData, importAuthorsData, importPublisherData, importLanguageData, importBooksData};
