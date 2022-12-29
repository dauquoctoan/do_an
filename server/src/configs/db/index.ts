const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.ACCESS_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('Connect db successfully!!!')
    } catch (error) {
        console.log('Connect db failure!!!')
    }
}

export default { connect }
