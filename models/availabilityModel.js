const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },
    quantity: Number
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;