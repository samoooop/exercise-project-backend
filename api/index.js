const express = require('express');

require('dotenv').config();
const config = require('./config');
const PORT = config.port;

const userRouter = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  await mongoose.connect(config.mongoUri, config.mongoOptions);
});
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/users', userRouter);

module.exports = app;
