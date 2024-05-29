import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    language: String
});

const Language = mongoose.model("Language", languageSchema);
export default Language;