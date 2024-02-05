const moogoose = require('mongoose')

const connectDB = async () => {
    try {
        await moogoose.connect(process.env.DATABASE)
        console.log('connecting database ...')
    } catch (error) {
        console.log('error on connect db :', error)
        process.exit(1)
    }
}

module.exports = connectDB