const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, "A user must have a surname"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "A user must have a email"],
        validate: [isEmail, 'invalid email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a email"],
        trim: true,
    },
    role: {
        type: String,
        required: [true, "A user must have a role"],
        default: 1,
        trim: true,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;