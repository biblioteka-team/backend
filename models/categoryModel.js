import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "A book must have a category"],
        trim: true,
    },
    category_ukr: {
        type: String,
        required: [true, "A book must have a category"],
        trim: true,
    },
    genre_id: [{
        type: Schema.Types.ObjectId,
        ref: "Genre",
        index: true
    }],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;