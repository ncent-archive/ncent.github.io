// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//json parser
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

// initialize express-session to allow tracking of currentUser
app.use(session({
  key: 'session_token',
  secret: 'temporary-nonsecure-key',
  resave: false,
  saveUnititalized: false,
  cookie: {
    expires: 60000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.session_token && !req.session.user) {
    res.clearCookie('session_token');
  }
  next();
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


// Serve our api
app.use('/api', require('./api'));

// Always return main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
