const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4001;
const config = require('./config');

const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/users', userRouter);

module.exports = app;
