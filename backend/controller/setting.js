const Phone = require('../models/phone')
const Memory = require('../models/memory')
const Color = require('../models/color')


exports.listSetting = async (req, res) => {
    try {

        const phone = await Phone.find();
        const memory = await Memory.find();
        const color = await Color.find();

        res.status(200).send({
            phone: phone,
            memory: memory,
            color: color,
        })
    } catch (error) {
        console.log("error on list setting :", error)
        res.status(500).send('error on list setting')
    }
}

exports.insertPhone = async (req, res) => {
    try {
        const { values } = req?.body
        console.log(values)

        const phone = await new Phone({

            name: values?.name,

        }).save();

        res.status(200).send(phone)
    } catch (error) {
        console.log("error on insert phone :", error)
        res.status(500).send('error on insert phone')
    }
}

exports.deletePhone = async (req, res) => {
    try {

        let phone = await Phone.findOneAndDelete({ _id: req.params.id });

        res.status(200).send(phone)
    } catch (error) {
        console.log("error on delete phone :", error)
        res.status(500).send('error on delete phone')
    }
}
exports.insertMemory = async (req, res) => {
    try {
        const { values } = req?.body
        console.log(values)

        const memory = await new Memory({

            name: values?.name,

        }).save();

        res.status(200).send(memory)
    } catch (error) {
        console.log("error on insert memory :", error)
        res.status(500).send('error on insert memory')
    }
}

exports.deleteMemory = async (req, res) => {
    try {

        let memory = await Memory.findOneAndDelete({ _id: req.params.id });

        res.status(200).send(memory)
    } catch (error) {
        console.log("error on delete memory :", error)
        res.status(500).send('error on delete memory')
    }
}
exports.insertColor = async (req, res) => {
    try {
        const { values } = req?.body
        console.log(values)

        const color = await new Color({

            name: values?.name,

        }).save();

        res.status(200).send(color)
    } catch (error) {
        console.log("error on insert color :", error)
        res.status(500).send('error on insert color')
    }
}

exports.deleteColor = async (req, res) => {
    try {

        let color = await Color.findOneAndDelete({ _id: req.params.id });

        res.status(200).send(color)
    } catch (error) {
        console.log("error on delete color :", error)
        res.status(500).send('error on delete color')
    }
}