const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Establish Mustache as Views Engine and point to partials
const VIEWS_PATH = path.join(__dirname,'/views');
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views', VIEWS_PATH);
app.set('view engine','mustache');

// Point to Static files (styles, assets, etc..)
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));

// Set your routes here
app.use(require('./routes/index'));


// Create local Server Function
app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
  });