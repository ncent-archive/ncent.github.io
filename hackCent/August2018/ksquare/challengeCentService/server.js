// jshint esversion: 6
// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const ncentSDK = require('./SDK/source/ncentSDK');

//const ncentSDK = require("ncentSDK");


const controllers = require('./backend/controllers');
//const db = require("./backend/models");
//const config = require('./backend/config/main');
const app = express();




// serve our static stuff like index.css
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Middleware to require login/auth
const passportService = require('./backend/config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// api routes
app.get('/api', controllers.api.index);
app.get('/api/user', controllers.user.index);
app.post('/api/user/signup', controllers.user.signup);
app.post('/api/user/login', requireLogin, controllers.user.login);

app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
 res.render((__dirname + '/src/indextest.html'), {});
});
//For avoidong Heroku $PORT error
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
