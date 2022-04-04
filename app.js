const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const session = require('cookie-session');
const PORT = process.env.PORT || 3000;


// session data
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))
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
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/gamepage'));
app.use(require('./routes/rules'));


// Create local Server Function
app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
  });