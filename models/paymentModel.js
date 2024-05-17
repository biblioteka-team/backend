const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Payment must have a order"],
        ref: "Order",
    },
    payment_sum: {
        type: Number,
        required: [true, "Payment must have a total sum"],
        trim: true,
    },
});

const Payment= mongoose.model("Payment", paymentSchema);
module.exports = Payment;