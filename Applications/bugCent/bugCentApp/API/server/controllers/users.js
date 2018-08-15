const Bug = require('../models').Bug;
const User = require('../models').User;
const bugUser = require('../models').bugUser;
const bcrypt = require('bcrypt');
const path = require('path');
const ncentSDK = require('../../../../../../SDK/source/');
const ncentSdkInstance = new ncentSDK();

module.exports = {
  getBalance(req, res){
    return User
      .findById(req.session.user.uuid, {
      })
      .then(user => {
        console.log('here');
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return new Promise(function(resolve, reject) {
          return ncentSdkInstance.getTokenBalance(user.email,'9d91db6b-f33a-4392-a583-a6ea14bd368f',resolve);
        })
        .then(data => res.status(200).send(data))
        .catch(error=> console.log(error));

      })
      .catch(error => res.status(400).send(error));
  },
  updateBugPage(req, res){
    res.sendFile(path.resolve(__dirname + '/public/updatebug.html'));
  },
  logOut(req, res){
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
    } 
    res.sendFile(path.resolve('__dirname' + '../../../../index.html'));
  },
  dashboard(req, res){
      if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/index.html');
      } else {
          res.redirect('/login');
      }
  },
  report(req, res){
    if (req.session.user && req.cookies.user_sid) {
      res.sendFile(__dirname + '/public/dashboard/dashboard.html');
    } else {
        res.redirect('/login');
    }
  },
  getUser(req, res){
    let username = req.body.username;
    let password = req.body.password;

      User.findOne({ where: { username: username } }).then(function (user) {
          if (!user) {
              // res.render(user, '/login');
              res.sendFile(__dirname + '/public/login/loginerror.html');
          } else if (!bcrypt.compareSync(password, user.password)) {
              // res.render(user, '/login');
              res.sendFile(__dirname + '/public/login/loginerror.html');
          } else {
             // res.render(user.dataValues, '/dashboard');
              req.session.user = user;
              res.sendFile(__dirname + '/public/index.html');
             
          }
      });
  },
  getRedirect(req, res){
    const sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
          res.redirect('/dashboard');
      } 
      else {
          next();
      }    
    }
    res.sendFile(path.resolve('__dirname' + '../../../../index.html'));
  },
  getLogIn(req, res){
    sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
          res.redirect('/dashboard');
      } else {
          next();
      }    
    }
    res.sendFile(__dirname + '/public/login/login.html');
  },
  getPage(req, res){
    sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
          res.redirect('/dashboard');
      } else {
          next();
      }    
    }
    res.sendFile(__dirname+ '/public/signup/signup.html');
  },
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isCompany: req.body.isCompany
        
      })
      .then(user =>{
        return new Promise(function(resolve, reject) {
          ncentSdkInstance.createWalletAddress(req.body.email, '9d91db6b-f33a-4392-a583-a6ea14bd368f', resolve);
        })
        .then(res.status.send(200))
        .catch(error => console.log(error));
       // ncentSdkInstance.createWalletAddress(req.body.email, TOKENTYPE_ID, resolve);
        req.session.user = user.dataValues;
        //req.login(user.uuid);
        if (user.dataValues && req.cookies.user_sid) {
          res.sendFile(__dirname + '/public/index.html');
        } else {
            res.redirect('/login');
        }
        //res.sendFile(__dirname + '/public/dashboard/dashboard.html');
      })
      .catch(error => {
        res.sendFile(__dirname+ '/public/signup/signuperror.html');
        
      });
  },
  
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: bugUser,
          as: 'bugs',
          attributes: ['bug_uuid']
        }],
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  retrieveWithUser(req, res) {
    return User
      .findById(req.session.user.uuid, {
        include: [{
          model: bugUser,
          as: 'bugs',
          attributes: ['bug_uuid']
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.user_uuid, {
        include: [{
          model: bugUser,
          as: 'bugs',
          attributes: ['bug_uuid']
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return User
      .findById(req.params.user_uuid, {
        include: [{
          model: bugUser,
          as: 'bugs',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
        .find
          .update({
            name: req.body.name || user.name,
          })
          .then(() => res.status(200).send(user))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};