const Logger = require('r7insight_node');

/* Environmental config */
require('dotenv').config();


/****************************************************************************
* Function init()
* This function is used to initiate Rapid7 Insights.
*****************************************************************************/
function init(region) {
  if (process.env.RAPID7_ACCESS_TOKEN) {
    global.logger = new Logger({ token: process.env.RAPID7_ACCESS_TOKEN, region: region });
  }
}


/****************************************************************************
* Function log()
* This function is used to send a log to Rapid7 Insighs.
*****************************************************************************/
function log(data) {
  global.logger.error('err', data);
}


module.exports = {
  init: init,
  log: log
};
