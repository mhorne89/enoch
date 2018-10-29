'use strict';

/* Node modules */
const express = require('express');
const cors = require('cors');
const enoch = require('./index');
const app = express();

app.use(cors());

enoch.clean('0 0 * * *', 60);
enoch.serve(app);


app.listen(8085, () => console.log('Node server running on port 8085'));
