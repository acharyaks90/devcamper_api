const express = require("express");
const dotenv = require("dotenv");
const bootcampsRoutes = require('./routes/bootcamps');
const logger = require('./middleware/logger');


//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
app.use(logger);
app.use('/api/v1/bootcamps', bootcampsRoutes);

app.get('/', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Krish'});
});

