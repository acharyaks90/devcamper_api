const mongoose = require('mongoose');

    const connectDB = async()=>{
        const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).catch(err=>{
            console.log(err);
        })
        console.log(`Mongoose connected: ${conn.connection.host}`);
    }
    module.exports = connectDB;

