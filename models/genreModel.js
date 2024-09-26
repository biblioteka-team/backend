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
    },
    category_id: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "A genre must have a category"],
        index: true
    }]
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;