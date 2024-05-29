import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "An address must have a user"],
        ref: "User",
    },
    appartment: String,
    building:  {
        type: String,
        required: [true, "An address must have a building"],
        trim: true,
    },
    street: {
        type: String,
        required: [true, "An address must have a street"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "An address must have a city"],
        trim: true,
    },
    province: {
        type: String,
        required: [true, "An address must have a province"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "An address must have a country"],
        trim: true,
    },
    postal_code: {
        type: String,
        required: [true, "An address must have a postal code"],
        trim: true,
    },
});

const Address = mongoose.model("Address",addressSchema);
export default Address;