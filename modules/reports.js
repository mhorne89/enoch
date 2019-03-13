'use strict';

const fs = require('fs');
const moment = require('moment');
const isJSON = require('is-json');


/****************************************************************************
* Function init()
* This function should be called to ensure that a /reports directory exists and
* load the logs into the global memory.
*****************************************************************************/
function init() {
  fs.access('./reports', (err) => (err) ? fs.mkdirSync('./reports') : null);

  if (!global.revelation_reports) {
    global.revelation_reports = [];

    fs.readdir('./reports/', (err, files) => {
      if (files) {
        files.forEach(file => {
          fs.readFile(`./reports/${ file }`, 'utf-8', (err, report) => {
            if (isJSON(report)) global.revelation_reports.push(JSON.parse(report));
          });
        });
      }
    });
  }
}

/****************************************************************************
* Function store()
* This function is used to gather data on the client side to be used in
* report.
*****************************************************************************/
function store(app) {
  app.post('/revelation/store', (req, res) => {
    fs.writeFile(`./reports/${ moment().format('x') }.json`, JSON.stringify(req.body), (err) => (err) ? console.log(err) : null);
    res.status(200).send({ body: 'OK' });
  });
}


module.exports = {
  init: init,
  store: store
};
