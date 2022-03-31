const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(4000, () => {
  console.log('Server is running');
});
