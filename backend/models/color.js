const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = Color = mongoose.model("color", ColorSchema);