const mongoose = require('mongoose')

async function connect() {
    try {
        // await mongoose.connect(process.env.ACCESS_DB, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        // })
         await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@leaning-app.zvik9qk.mongodb.net/learning_app?useNewUrlParser=true&useUnifiedTopology=true&useCreateIndex=true&useFindAndModify=false`);
        console.log('Connect db successfully!!!')
    } catch (error) {
        console.log('Connect db failure!!!')
    }
}

export default { connect }
