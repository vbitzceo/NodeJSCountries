const express = require('express');
const index = require('./routes/index');
const api = require('./routes/api');

const port = 1337;

const app = express();

app.use(express.static('public'));
app.use(index);
app.use(api);

console.log(`The port is ${port}`);

app.listen(port);