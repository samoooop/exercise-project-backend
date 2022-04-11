const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const config = require('../config');
const PORT = config.port;

const userRouter = require('../routes/user');

const app = express();

/*
When running on Vercel, Vercel will take express app exported from this file.
We do not have control over port and things that should be run before the app.listen()
eg. mongoose.connect(). So we should connect to mongoose before every request by adding middleware below

Note: Create new connection to database before
 */
if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}
// Body parser to parse json in request body for us
app.use(bodyParser.json());
// CORS
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Our routers
app.use('/users', userRouter);

module.exports = app;