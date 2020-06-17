const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes');

const headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true // allow session cookie from browser to pass through 
}

app.use(cors(headers));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));