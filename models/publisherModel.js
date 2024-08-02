import mongoose from "mongoose";
const { Schema } = mongoose;

const publisherSchema = new Schema({
    Publisher: {
        type: String,
        required: [true, "A book must have a publisher"],
        trim: true,
    }
});

const Publisher = mongoose.model("Publisher", publisherSchema);
export default Publisher;