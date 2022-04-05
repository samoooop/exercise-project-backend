const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

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

const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  // Start express server
  app.listen(4000, () => {
    console.log('Server is running');
  });
};

boot();
