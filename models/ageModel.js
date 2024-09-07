import mongoose from "mongoose";
const { Schema } = mongoose;

const ageSchema = new mongoose.Schema({
    age: {
        type: String,
        trim: true,
    },
    age_ukr: {
        type: String,
        trim: true,
    },
});

const Age = mongoose.model("Age", ageSchema);
export default Age;