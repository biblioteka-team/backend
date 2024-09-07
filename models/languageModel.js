import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: [true, "A book must have a language"],
        trim: true,
    },
    language_ukr: {
        type: String,
        trim: true,
    }
});

const Language = mongoose.model("Language", languageSchema);
export default Language;