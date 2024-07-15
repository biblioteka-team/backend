import mongoose from "mongoose";
const { Schema } = mongoose;

const storageDataSchema = new mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },
    quantity: Number
});

const Storagedata = mongoose.model("Datastorage", storageDataSchema);
export default Storagedata;