const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());
// Require our routes into the application.
require('./server/routes')(app);
app.disable('etag');
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));



// // route for handling 404 requests(unavailable routes)
// app.use(function (req, res, next) {
// res.status(404).send("Sorry can't find that!")
// });


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
// initialize express-session to allow us track the logged-in user across sessions.


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;