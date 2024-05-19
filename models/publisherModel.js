const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    Publisher: {
        type: String,
        required: [true, "A book must have a publisher"],
        trim: true,
    }
});

const Publisher = mongoose.model("Publisher", publisherSchema);
module.exports = Publisher;