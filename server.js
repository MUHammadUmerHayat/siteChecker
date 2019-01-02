'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('\n 😃'));


app.listen(config('PORT'), (err) => {
  if (err) throw err

  console.log(`\n Sitecheka on PORT ${config('PORT')}`)
});
