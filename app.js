const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const path = require('path');
require('dotenv').config();
const session = require('cookie-session');
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SECRET || ['loijpasoh'],
  resave: true,
  saveUninitialized: false
}))

app.use((req,res,next)=>{
  res.locals.authenticated = req.session.user == null || undefined ? false : true
  next()
})

const VIEWS_PATH = path.join(__dirname,'/views');
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views', VIEWS_PATH);
app.set('view engine','mustache');

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/gamepage'));
app.use(require('./routes/rules'));
app.use(require('./routes/passwordreset'));

app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
  });