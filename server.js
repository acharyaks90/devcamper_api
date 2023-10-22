const dotenv = require("dotenv");
const express = require("express");
const bootcampsRoutes = require('./routes/bootcamps');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'});

//connect to db
connectDB();

const app = express();
const PORT = process.env.PORT;

const server = app.listen(PORT, ()=>{
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
app.use(express.json());
 
app.use(logger);
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}
app.use('/api/v1/bootcamps', bootcampsRoutes);
app.use(errorHandler);

app.get('/', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Krish'});
});

app.get('/anil', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Anilnpm'});
});

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    server.close(()=> process.exit(1));
})

