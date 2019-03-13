'use strict';

const fs = require('fs');
const isJSON = require('is-json');

/****************************************************************************
* Function set()
* Tries to read a configuration file set by the user in the root directory of
* their project.
*****************************************************************************/
function set () {
  fs.readFile('.revelation.json', 'utf-8', (err, config) => {
    if (isJSON(config)) global.revelation_config = JSON.parse(config);
  });
}

module.exports = { set: set };
