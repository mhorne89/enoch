'use strict';

// Import NPM modules
const fs = require('fs');
const moment = require('moment');
const cron = require('node-cron');
const isJSON = require('is-json');
const expressip = require('express-ip');
const path = require('path');

// Import custom modules
const rapid7 = require(path.join(__dirname, 'rapid7'));


/****************************************************************************
* Function init()
* This function should be called to ensure that a /logs directory
* exists and load the logs into the global memory.
*****************************************************************************/
function init() {
  fs.access('./logs', (err) => (err) ? fs.mkdirSync('./logs') : null);

  if (!global.revelation_logs) {
    global.revelation_logs = [];

    fs.readdir('./logs/', (err, files) => {
      if (files) {
        files.forEach(file => {
          fs.readFile(`./logs/${ file }`, 'utf-8', (err, log) => {
            if (isJSON(log)) global.revelation_logs.push(JSON.parse(log));
          });
        });
      }
    });
  }
}


/****************************************************************************
* Function store()
* This function reads the selected data from the request and response and 
* stores it within a JSON file in the logs directory. If RAPID7_ACCESS_TOKEN
* is set in the environmental variables, the log will also be sent there.
*****************************************************************************/
function store(req, res, next) {
  const log = {
    request_url: `${ req.hostname }${ req.path }`,
    request_body: req.body,
    request_method: req.method,
    request_headers: req.headers,
    api_endpoint: req.baseUrl,
    location: req.ipInfo || {},
    timestamp: moment().format('x')
  };

  const send = res.send;

  res.send = function(data) {
    try { log.response_body = JSON.parse(data); }
    catch(e) { log.response_body = data; }

    send.apply(this, arguments);
    return this;
  };

  res.on('finish', () => {
    log.response_status = res.statusCode;
    global.revelation_logs.push(log);
    fs.writeFile(`./logs/${ moment().format('x') }.json`, log, (err) => (err) ? console.log(err) : null);
    
    if (process.env.RAPID7_ACCESS_TOKEN) rapid7.log(log);
  });

  next();
}


/****************************************************************************
* Function clean()
* This function is used to clean up old logs we do not wish to store anymore. 
* 
* The function takes a cron_schedule and removal_time_in_days as arguments to
* determine which logs should be removed and how frequently.
*
* For example, revelation.cleanLogs('0 0 * * *', 30) will run a cron job every
* day at midnight to remove logs that are > 30 days old.
*****************************************************************************/
function clean(cron_schedule, removal_time_in_days) {
  if (!removal_time_in_days) removal_time_in_days = 30;

  const removal_time = moment().subtract(removal_time_in_days, 'days').format('x');

  cron.schedule(cron_schedule, () => {
    fs.readdir('./logs/', (err, files) => {
      files.forEach(file => (file.split('')[0] < removal_time) ? fs.unlink(`./logs/${ file }`) : null);
    });
  });
}


module.exports = {
  init: init,
  store: store,
  clean: clean
};
