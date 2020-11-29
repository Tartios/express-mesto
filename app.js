const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Routers = require('./routes/routers.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5fc13f5d9955f90ea85ba9f0',
  };

  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Routers);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
