
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers['authtoken']
        if (!token) return res.status(401).send('no token')
        const decode = jwt.verify(token, 'codeforjwt')
        req.user = decode.user
        next()
    } catch (error) {
        console.log("error on middleware :", error)
        res.status(500).send('error on middleware')
    }
}

exports.admin = async (req, res, next) => {
    try {
        // console.log("admin:", req.user)
        if (!req?.user?.role) return res.status(401).send('you!! not allowed')
        next()
    } catch (error) {
        console.log("error on middleware :", error)
        res.status(500).send('error on middleware')
    }
}
