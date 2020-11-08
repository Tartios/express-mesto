const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const app = express();
const Routers = require('./routes/routers.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Routers);

app.use('*', (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден"  });
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
