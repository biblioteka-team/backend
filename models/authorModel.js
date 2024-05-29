import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "An author must have a name"],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, "An author must have a surname"],
        trim: true,
    },
    name_ukr: {
        type: String,
        trim: true,
    },
    surname_ukr: {
        type: String,
        trim: true,
    }
});

const Author = mongoose.model("Author", authorSchema);
export default Author;