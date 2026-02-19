const express = require('express');
const connectdb = require('./config/db');
const cors = require("cors");
const authroutes = require('./routes/auth.routes');
const homeworkroutes = require('./routes/homework.routes')
connectdb();
const app =  express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authroutes);
app.use('/api/homework',homeworkroutes);
module.exports = app;