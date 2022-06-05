const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const mustacheExpress = require('mustache-express');
const init = require('./auth/passportConfig');
const session = require('cookie-session');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
init(passport,
  username => user.find(user => user.username === username),
  id => user.find(user => user.id === id))

// session data
app.use(session({
  secret: `${process.env.SECRET}`,
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
app.use(require('./routes/rules'));
app.use(require('./routes/gamepage'));
app.use(require('./routes/users/login'));
app.use(require('./routes/users/register'));
app.use(require('./routes/users/passwordreset'));


// Create local Server Function
app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
  });