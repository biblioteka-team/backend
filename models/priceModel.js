const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },
    original_price: Number,
    discounted_price: Number

});

const Price = mongoose.model("Price", priceSchema);
module.exports = Price;