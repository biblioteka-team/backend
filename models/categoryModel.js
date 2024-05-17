const mongoose = require("mongoose");

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
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;