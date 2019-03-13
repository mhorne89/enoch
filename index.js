'use strict';

// Import NPM modules
const path = require('path');
const express = require('express');
const expressip = require('express-ip');

// Import custom modules
const config = require(path.join(__dirname, 'modules/config'));
const logs = require(path.join(__dirname, 'modules/logs'));
const reports = require(path.join(__dirname, 'modules/reports'));
const rapid7 = require(path.join(__dirname, 'modules/rapid7'));

// Read configuration
config.set();

// Initiate logging and reporting
logs.init();
reports.init();
rapid7.init('en');


/****************************************************************************
* Function serve()
* This function will add a route to your Express application /revelation/logs
* which is used by the applciation to retrieve the logs and reports from the
* Node.js layer. It also serves the application under the /revelation/..
* sub directory so you can view a UI that displays all your data.
*****************************************************************************/
function serve(app) {  
  app.use(expressip().getIpInfoMiddleware);
  
  app.get('/revelation/logs', (req, res) => {
    if (req.headers.uuid === global.revelation_session) res.status(200).send(global.revelation_logs).end();
    else res.status(401).send().end();
  });
  
  app.get('/revelation/reports', (req, res) => {
    if (req.headers.uuid === global.revelation_session) res.status(200).send(global.revelation_reports).end();
    else res.status(401).send().end();
  });

  app.post('/revelation/auth', (req, res) => {
    if (req.body.password === global.revelation_config.secret) {
      global.revelation_session = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      res.status(200).send({ uuid: global.revelation_session }).end();
    } else res.status(500).send({ error: 'Password is incorrect' }).end();
  });
  
  app.get(['/revelation', '/revelation/**'], (req, res) => {
    app.use(express.static(__dirname + '/dist'));
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


module.exports = {
  storeLog: logs.store,
  cleanLogs: logs.clean,
  storeReports: reports.store,
  serve: serve
};
