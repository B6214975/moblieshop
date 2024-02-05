const Information = require('../models/information')

exports.listPaytoday = async (req, res) => {
    try {
        const search = req?.params?.search

        var now = new Date();
        var startOfToday = new Date();
        startOfToday = startOfToday.toISOString().split('T')[0]

        if (search == 'All-customer-Search') {
            const information = await Information.find({
                "terms.date": startOfToday
            });

            res.status(200).send(information)
        } else {
            const information = await Information.find({ "terms.date": startOfToday, name: { $regex: `.*${search}.*` } });
            res.status(200).send(information)
        }

    } catch (error) {
        console.log("error on list paytoday :", error)
        res.status(500).send('error on list paytoday')
    }
}