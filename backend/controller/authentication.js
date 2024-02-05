const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //  duplicate user
        // const { username, password } = req.body;
        const values = req?.body?.values

        let { username } = values
        let { password } = values
        let { firstname } = values
        let { lastname } = values
        let { phone } = values

        let duplicate = await User.findOne({ username })
        if (duplicate) {
            return res.status(400).send('user duplicate')
        } else {
            const salt = await bcrypt.genSalt(10)
            let user = new User({
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
            })
            // encryption
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            res.status(200).send(user)
        }

    } catch (error) {
        console.log("error on register :", error)
        res.status(500).send('error on register')
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body?.values;
        console.log(username)
        console.log(password)
        let user = await User.findOneAndUpdate(
            { username }, { new: true }
        )
        console.log(user)
        if (user && user.enabled) {
            // chcek password 
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const payload = {
                    user: {
                        userid: user._id,
                        username: `${user.firstname} ${user.lastname}`,
                        role: user.admin
                    }
                }
                // generate token
                jwt.sign(payload, 'codeforjwt', { expiresIn: '1d' },
                    (error, token) => {
                        if (error) throw error
                        res.status(200).json({ payload, token })
                    })
            } else {
                return res.status(400).send('password invalid')
            }
        } else if (!user?.enabled) {
            return res.status(400).send('user enabled')
        } else {
            return res.status(400).send('user not found')
        }

    } catch (error) {
        console.log("error on login :", error)
        res.status(500).send('error on login')
    }
}

exports.listUser = async (req, res) => {
    try {

        const user = await User.find()

        res.status(200).send(user)

    } catch (error) {
        console.log("error on list user :", error)
        res.status(500).send('error on list user')
    }
}

exports.deleteUser = async (req, res) => {
    try {
        // console.log(req?.params?.id)
        const user = await User.findOneAndDelete({ _id: req?.params?.id })

        res.status(200).send(user)

    } catch (error) {
        console.log("error on delete user :", error)
        res.status(500).send('error on delete user')
    }
}

exports.updateUser = async (req, res) => {
    try {
        console.log(req?.body)
        const { value } = req?.body

        let { username } = value
        let { password } = value
        let { firstname } = value
        let { lastname } = value
        let { phone } = value

        const salt = await bcrypt.genSalt(10)

        password = await bcrypt.hash(password, salt)

        const user = await User.findOneAndUpdate({ _id: value.id },
            {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
            })

        res.status(200).send(user)

    } catch (error) {
        console.log("error on update user :", error)
        res.status(500).send('error on update user')
    }
}
exports.updateUserEnabled = async (req, res) => {
    try {
        console.log(req?.body)
        const { value } = req?.body

        let { status } = value


        const user = await User.findOneAndUpdate({ _id: req?.params.id },
            {
                enabled: status,
            })

        res.status(200).send(user)

    } catch (error) {
        console.log("error on update user enabled :", error)
        res.status(500).send('error on update user enabled ')
    }
}
exports.updateUserAdmin = async (req, res) => {
    try {
        console.log(req?.body)
        const { value } = req?.body

        let { status } = value


        const user = await User.findOneAndUpdate({ _id: req?.params.id },
            {
                admin: status,
            })

        res.status(200).send(user)

    } catch (error) {
        console.log("error on update user admin:", error)
        res.status(500).send('error on update user admin')
    }
}