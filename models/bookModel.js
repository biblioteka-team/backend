import mongoose from "mongoose";
const { Schema } = mongoose;
import Publisher from "./publisherModel.js";
import Language from "./languageModel.js";
import Datastorage from "./storagedataModel.js";
import Cover from "./coverModel.js";
import Age from "./ageModel.js";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A book must have a title"],
        unique: true,
        trim: true,
        index: true
    },
    author_id: [{
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: [true, "A book must have an author"],
        index: true
    }], 
    publisher_id: [{
        type: Schema.Types.ObjectId,
        ref: Publisher,
        required: [true, "A book must have a publisher"],
        index: true
    }], 
    pagesQty: {
        type: Number,
        index: true
    },
    language_id: [{
        type: Schema.Types.ObjectId,
        ref: Language,
        required: [true, "A book must have a language"],
        index: true
    }],
    summary: {
        type: String,
        required: [true, "A book must have a summary"],
        unique: true,
        trim: true,
        index: true
    },
    coverImageLink: [String],
    isbn: String,
    category_id: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "A book must have a category"],
        index: true
    }],
    publication_year: String,
    type: String,
    coverType_id: {
        type: Schema.Types.ObjectId,
        ref: Cover,
        index: true
    },
    condition: String,
    title_ukr: {
        type: String,
        index: true
    },
    summary_ukr: String,
    coverImageLink_ukr: [String],
    created: { 
        type: Date,
        default: Date.now,
        index: true
      },
    price_id: {
        type: Schema.Types.ObjectId,
        ref: "Price",
        required: [true, "A book must have a price"],
        index: true
    },
    storage_id: {
        type: Schema.Types.ObjectId,
        ref: Datastorage,
        index: true
    },
    age_id: {
        type: Schema.Types.ObjectId,
        ref: Age,
        index: true
    }
    
}); 

const Book = mongoose.model("Book", bookSchema);
export default Book;