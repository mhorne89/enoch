'use strict';

/* Node modules */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const revelation = require('./index');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('**', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.sendStatus(200);
  next();
});

app.use((req, res, next) => {
  req.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  req.header('Access-Control-Allow-Headers', '*');
  next();
});

revelation.cleanLogs('0 0 * * *', 60);
revelation.storeReports(app);
revelation.serve(app);


app.listen(8081, () => console.log('Node server running on port 8081'));
