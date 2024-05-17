const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A book must have a title"],
        unique: true,
        trim: true,
    },
    author_id: {
        type: [Schema.Types.ObjectId],
        ref: "Author",
        required: [true, "A book must have an author"],
    },
    publisher: {
        type: [Schema.Types.ObjectId],
        ref: "Publisher",
        required: [true, "A book must have a publisher"],
    }, 
    pages: Number,
    language: {
        type: [Schema.Types.ObjectId],
        ref: "Language",
        required: [true, "Language must be added"],
    },
    summary: {
        type: String,
        required: [true, "A book must have a summary"],
        unique: true,
        trim: true,
    },
    coverImageLink: String,
    isbn: String,
    category: {
        type: [Schema.Types.ObjectId],
        ref: "Category",
        required: [true, "A book must have a category"],
    },
    publication_year: String,
    type: String,
    condition: String,
    title_ukr: String,
    summary_ukr: String,
    coverImageLink_ukr: String
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;