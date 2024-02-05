const Information = require('../models/information')

exports.listBacklist = async (req, res) => {
    try {
        const search = req?.params?.search
        if (search == 'All-customer-Search') {
            const information = await Information.find({ backlist: true });
            res.status(200).send(information)
        } else {
            const information = await Information.find({ backlist: true, name: { $regex: `.*${search}.*` } });
            res.status(200).send(information)
        }

    } catch (error) {
        console.log("error on list backlist :", error)
        res.status(500).send('error on list backlist')
    }
}