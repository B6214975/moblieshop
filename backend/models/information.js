const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const InformationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        phonenumber: {
            type: String,
        },
        phone: {
            type: String,
        },
        memory: {
            type: String,
        },
        color: {
            type: String,
        },
        total: {
            type: Number,
        },
        down: {
            type: Number,
        },
        installment: {
            type: Number,
        },
        orderdate: {
            type: Date,
        },
        installmentDate: {
            type: Date,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        backlist: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: false
        },
        terms: []

    },
    { timestamps: true }
);

module.exports = Information = mongoose.model("information", InformationSchema);