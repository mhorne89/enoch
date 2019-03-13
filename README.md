[![https://nodei.co/npm/enoch.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/enoch.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/enoch)

[![Node version](https://img.shields.io/node/v/enoch.svg?style=flat)](http://nodejs.org/download/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![NSP Status](https://nodesecurity.io/orgs/dwyl/projects/1047e39b-0d4a-45ff-af65-c04afc41fc20/badge)](https://nodesecurity.io/orgs/dwyl/projects/1047e39b-0d4a-45ff-af65-c04afc41fc20)


# Revelation - An Express Middleware to log API requests

## Instalation

`npm i revelation-server`

## Usage

At the top of your node file, include this line:

```
const revelation = require('revelation-server');
```


### Store logs

To store logs, attach the .storeLog() function to the Express route as a middleware either by doing:

```
app.use('**', revelation.storeLog);
```

to capture all routes or directly on the route like:

```
router.post('/example', revelation.storeLog(), (req, res, next) => {
  // Do something

  next();
});
```


### Clean logs

Revelation stores logs as JSON files, in order to clean up old JSON files and prevent excess disk usage, call the cleanup file like so:

`revelation.cleanLogs('0 0 * * *', 60);`

The 2 parameters to provide are:

- cron_schedule
- removal_time_in_days (optional)

So in the above example, this will start a cron job to run every day at midnight and will remove JSON logs which are more than 60 days old.


### Serve UI

Revelation has a basic UI which will create a routes named `/revelation/logs` to be used by the application to fetch the logs and `/revelation/reports` to fetch the reports. It also creates a subdiretory named `/revelation` which you can navigate to to view your API logs. Add these routes to your applcication by including the following line in your Node applicaiton.

```
revelation.serve(app);
```


## Configuration
Revelation will read from a configuration file, `.revelation.json`, which you can place in the root directory of your project. The following options are available to be configured.

* secret - Password to be used for UI authentication.


## Run in dev mode

To run in dev mode simply clone the repo, navigate to the directory and run `npm run dev` which will allow you to edit the UI directly with the Angular CLI on port 4000. You can also run `npm run prod` to serve the UI from the Node.js server. This will run Enoch, including the UI, on your local machine at `localhost:8081`. You will need to supply some sample logs in the `/logs` directory.


## 3rd party integrations 

Revelation currently supports external reporting to the following services:

* Rapid7 Insight - To enable Rapid7 logging, simply make sure you have set RAPID7_ACCESS_TOKEN in your environmental variables.
