const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            default: "employee",
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);