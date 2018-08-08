const Bug = require('../models').Bug;
const User = require('../models').User;
const bugUser = require('../models').bugUser;
const bcrypt = require('bcrypt');
// const session = require('express-session');
// const express = require('express');
// const app = express();

module.exports = {

  dashboard(req, res){
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
              res.sendFile(__dirname + '/public/login/login.html');
          } else if (!bcrypt.compareSync(password, user.password)) {
              res.render(user, '/login');
              res.sendFile(__dirname + '/public/login/login.html');
          } else {
             // res.render(user.dataValues, '/dashboard');
              res.sendFile(__dirname + '/public/dashboard/dashboard.html');
             
          }
      });
  },
  getRedirect(req, res){
  const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
  }
  res.redirect('/login');
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
        //req.session.user = user.dataValues;
        if (user.dataValues && req.cookies.user_sid) {
          res.sendFile(__dirname + '/public/dashboard/dashboard.html');
        } else {
            res.redirect('/login');
        }
        //res.sendFile(__dirname + '/public/dashboard/dashboard.html');
      })
      .catch(error => {
        res.redirect('/signup');
        console.log(error);
      });
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
        return res.status(200).send(user);
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