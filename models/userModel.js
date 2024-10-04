import mongoose from "mongoose";
import validator from "validator";

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
        required: [true, "A user must have an email"],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        },
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: [true, "A user must have a role"],
        trim: true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;