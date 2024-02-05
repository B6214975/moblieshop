const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const PhoneSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = Phone = mongoose.model("phone", PhoneSchema);