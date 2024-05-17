const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "An order must have a user"],
        ref: "User",
    },
    book_id: {
        type: [Schema.Types.ObjectId],
        required: [true, "An order must have a book"],
        ref: "Book",
    },
    shipping_address_id: {
        type: Schema.Types.ObjectId,
        required: [true, "An order must have a shipping address"],
        ref: "Address",
    },
    billing_address_id: {
        type: Schema.Types.ObjectId,
        required: [true, "An order must have a billing address"],
        ref: "Address",
    },
    total_sum: {
        type: Number,
        required: [true, "An order must have a total sum"],
        trim: true,
    },
    payment_status: {
        type: String,
        required: [true, "An order must have a status"],
        trim: true,
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;