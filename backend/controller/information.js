const Information = require('../models/information')

exports.insertInformation = async (req, res) => {
    try {

        const { values } = req.body;
        let genDate = new Date(values.installmentDate);

        // terms 
        const { total } = values
        const { down } = values
        const { installment } = values
        let pay = (total - down)

        const installmentAmount = Math.ceil(pay / installment)

        let terms = []

        for (let i = 0; i < installmentAmount; i++) {
            let date = new Date((genDate.setMonth(genDate.getMonth() + 1)))
            let installmentPay = installment
            if (i == (installmentAmount - 1)) {
                installmentPay = pay % installment == 0 ? installment : pay % installment
                console.log(pay % installment)
            }
            terms.push(
                {
                    key: i,
                    date: date,
                    pay: installmentPay,
                    status: false
                }
            )
        }

        const information = await new Information({
            type: values?.type,
            name: values?.name,
            phonenumber: values?.phonenumber,
            phone: values?.phone,
            memory: values?.memory,
            color: values?.color,
            total: values?.total,
            down: values?.down,
            orderdate: values?.orderdate,
            installment: values?.installment,
            installmentDate: values?.installmentDate,
            terms: terms,
        }).save();

        // console.log(req.body)
        res.status(200).send(information)

    } catch (error) {
        console.log("error on insert information :", error)
        res.status(500).send('error on insert information')
    }
}

exports.listInformation = async (req, res) => {
    try {
        const search = req?.params?.search
        if (search == 'All-customer-Search') {
            const information = await Information.find({ type: req?.params?.type });
            res.status(200).send(information)
        } else {
            const information = await Information.find({ type: req?.params?.type, name: { $regex: `.*${search}.*` } });
            res.status(200).send(information)
        }


    } catch (error) {
        console.log("error on list information :", error)
        res.status(500).send('error on list information')
    }
}

exports.getInformation = async (req, res) => {
    try {

        const information = await Information.findOne({ _id: req?.params?.id });
        res.status(200).send(information)

    } catch (error) {
        console.log("error on get information :", error)
        res.status(500).send('error on get information')
    }
}

exports.updateInformation = async (req, res) => {
    try {
        const { values } = req?.body

        let genDate = new Date(values.installmentDate);

        // terms 
        const { total } = values
        const { down } = values
        const { installment } = values
        let pay = (total - down)

        const installmentAmount = Math.ceil(pay / installment)

        let terms = []

        for (let i = 0; i < installmentAmount; i++) {
            let date = new Date((genDate.setMonth(genDate.getMonth() + 1)))
            date = date.toISOString().split('T')[0]
            // console.log(date)
            let installmentPay = installment
            if (i == (installmentAmount - 1)) {
                installmentPay = pay % installment == 0 ? installment : pay % installment
                console.log(pay % installment)
            }
            terms.push(
                {
                    key: i,
                    date: date,
                    pay: installmentPay,
                    status: false
                }
            )
        }

        let information = await Information.findOneAndUpdate({ _id: req.params.id },
            {
                name: values?.name,
                phonenumber: values?.phonenumber,
                phone: values?.phone,
                memory: values?.memory,
                color: values?.color,
                total: values?.total,
                down: values?.down,
                orderdate: values?.orderdate,
                installment: values?.installment,
                installmentDate: values?.installmentDate,
                terms: terms,
            }
        );

        // const information = await Information.findOne({ _id: req?.params?.id });
        res.status(200).send(information)

    } catch (error) {
        console.log("error on update information :", error)
        res.status(500).send('error on update information')
    }
}

exports.payInstallment = async (req, res) => {
    try {
        const { values } = req?.body

        const checkSuccess = (Object) => {
            return Object?.status == true
        }

        let array = values?.terms

        let status = array.every(checkSuccess)

        console.log(status)

        let information = await Information.findOneAndUpdate({ _id: req.params.id },
            {
                status: status,
                disabled: true,
                terms: values?.terms,
            }
        );

        res.status(200).send(information)

    } catch (error) {
        console.log("error on update payInstallment :", error)
        res.status(500).send('error on update payInstallment')
    }
}

exports.putBacklist = async (req, res) => {
    try {
        const { values } = req?.body

        console.log("status:", values?.status)

        let information = await Information.findOneAndUpdate({ _id: req.params.id },
            {
                backlist: values?.status,
            }
        );

        res.status(200).send(information)

    } catch (error) {
        console.log("error on update backlist :", error)
        res.status(500).send('error on update backlist')
    }
}

exports.removeInformation = async (req, res) => {
    try {


        let information = await Information.findOneAndDelete({ _id: req.params.id });

        res.status(200).send(information)

    } catch (error) {
        console.log("error on remove information :", error)
        res.status(500).send('error on remove information')
    }
}