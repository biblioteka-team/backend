const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A book must have a title"],
        unique: true,
        trim: true,
    },
    author_id: [{
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: [true, "A book must have an author"]
    }], 
    publisher_id: [{
        type: Schema.Types.ObjectId,
        ref: "Publisher",
        required: [true, "A book must have a publisher"],
    }], 
    pagesQty: Number,
    language_id: [{
        type: Schema.Types.ObjectId,
        ref: "Language",
        required: [true, "A book must have a publisher"],
    }],
    summary: {
        type: String,
        required: [true, "A book must have a summary"],
        unique: true,
        trim: true,
    },
    coverImageLink: String,
    isbn: String,
    category_id: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "A book must have a category"],
    }],
    publication_year: String,
    type: String,
    condition: String,
    title_ukr: String,
    summary_ukr: String,
    coverImageLink_ukr: String,
    created: { 
        type: Date,
        default: Date.now
      }
    
}); 

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;