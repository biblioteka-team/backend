import mongoose from "mongoose";
const { Schema } = mongoose;

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: [true, "A book must have a genre"],
        trim: true,
    },
    genre_ukr: {
        type: String,
        required: [true, "A book must have a genre"],
        trim: true,
    }
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;