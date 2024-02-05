const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const MemorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = Memory = mongoose.model("memory", MemorySchema);