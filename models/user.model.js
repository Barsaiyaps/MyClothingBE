const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    cart:{
        type: Array,
        default: [],
    }
});


const userModel=mongoose.model("User",userSchema)
module.exports = userModel;