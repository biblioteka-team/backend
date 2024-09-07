import mongoose from "mongoose";
const { Schema } = mongoose;

const coverSchema = new mongoose.Schema({
    cover_type: {
        type: String,
        trim: true,
    },
    cover_type_ukr: {
        type: String,
        trim: true,
    },
});

const Cover = mongoose.model("Cover", coverSchema);
export default Cover;