const express = require("express");
const dotenv = require("dotenv");
const bootcampsRoutes = require('./routes/bootcamps');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'});

//connect to db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
app.use(logger);
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcampsRoutes);

app.get('/', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Krish'});
});

process.on('uncaughtException', (err, promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=> process.exit());
})

