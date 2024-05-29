import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },
    quantity: Number
});

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;