import mongoose from "mongoose";
const { Schema } = mongoose;
// const Double = require("@mongoosejs/double");

const priceSchema = new mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },
    original_price: Number,
    discounted_price: Number

});

const Price = mongoose.model("Price", priceSchema);
export default Price;