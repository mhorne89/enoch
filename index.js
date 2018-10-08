'use strict';

const fs = require('fs');
const moment = require('moment');
const cron = require('node-cron');
const exphbs = require('express-handlebars');
const path = require('path');


/****************************************************************************
* Function init()
* This function should be called to ensure that a /logs directory exists.
*****************************************************************************/
function init() { fs.access('./logs', (err) => (err) ? fs.mkdirSync('./logs') : null); }


/****************************************************************************
* Function store()
* This function reads the selected data from the request and response and 
* stores it within a JSON file in the logs directory.
*****************************************************************************/
function store(req, res, next) {
  init();

  const log = {
    request_url: req.hostname,
    request_body: req.body,
    request_method: req.method,
    request_headers: req.headers,
    api_endpoint: req.baseUrl,
    response_body: res.body,
    response_status: res.status,
    timestamp: moment().format('x')
  };

  fs.writeFile(`./logs/${ moment().format('x') }.json`, JSON.stringify(log), (err) => (err) ? console.log(err) : next());
}


/****************************************************************************
* Function clean()
* This function is used to clean up old logs we do not wish to store anymore. 
* 
* The function takes a cron_schedule and removal_time_in_days as arguments to
* determine which logs should be removed and how frequently.
*
* For example, enoch.clean('0 0 * * *', 30) will run a cron job every day at
* midnight to remove logs that are > 30 days old.
*****************************************************************************/
function clean(cron_schedule, removal_time_in_days) {
  init();

  if (!removal_time_in_days) removal_time_in_days = 30;

  const removal_time = moment().subtract(removal_time_in_days, 'days').format('x');

  cron.schedule(cron_schedule, () => {
    fs.readdir('./logs/', (err, files) => {
      files.forEach(file => (file.split('')[0] < removal_time) ? fs.unlink(`./logs/${ file }`) : null);
    });
  });
}


/****************************************************************************
* Function serve()
* This function will add a route to your Express application /logs so you can
* view a UI that displays all your API logs.
*****************************************************************************/
function serve(app) {
  const logs = [];

  fs.readdir('./logs/', (err, files) => {
    files.forEach(file => {
      fs.readFile(`./logs/${ file }`, 'utf-8', (err, log) => logs.push(JSON.parse(log)));
    });
  });

  app.set('views', path.join(__dirname, '/views'));
  app.engine('.hbs', exphbs({ extname: '.hbs' }));
  app.set('view engine', '.hbs');

  app.get('/logs', (req, res) => {
    res.render('index', {
      logs: logs,
      helpers: {
        stringify: (object) => JSON.stringify(object),
        time: (timestamp) => moment.unix(timestamp / 1000).format('D MMM YY HH:mm:ss')
      }
    });
  });
}

module.exports = {
  store: store,
  clean: clean,
  serve: serve
};