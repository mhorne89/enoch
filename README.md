# Enoch - An Express Middleware to log API requests

## Instalation

`npm i enoch`

## Usage

At the top of your node file, include this line:

```
const enoch = require('enoch');
```


### Store logs

To store logs, attach the .store() function to the Express route as a middleware either by doing:

```
app.use('**', enoch.store());
```

to capture all routes or directly on the route like:

```
router.post('/example', enoch.store(), (req, res, next) => {
  // Do something

  next();
});
```


### Clean logs

Enoch stores logs as JSON files, in order to clean up old JSON files and prevent excess disk usage, call the cleanup file like so:

`enoch.clean('0 0 * * *', 60);`

The 2 parameters to provide are:

- cron_schedule
- removal_time_in_days (optional)

So in the above example, this will start a cron job to run every day at midnight and will remove JSON logs which are more than 60 days old.


### Serve UI

Enoch has a basic UI which will create a route named `/logs` which you can navigate to to view your API logs. Add this route to your applcication by including the following line in your Node applicaiton.

```
enoch.serve(app);
```


## Run in dev mode

To run in dev mode simply clone the repo, navigate to the directory and run `npm run dev`. You will need to supply some sample logs in the `/logs` directory. This will run Enoch, including the UI, on your local machine at `localhost:8085`.