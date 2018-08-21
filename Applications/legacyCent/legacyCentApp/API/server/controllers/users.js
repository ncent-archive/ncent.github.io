
const User = require('../models').User;
// const referredBy = require('../models').referredBy;

const path = require('path');

module.exports = {
  
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
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        points: 1,
      })
      .then(user =>{
        
        res.sendFile(path.resolve(__dirname + '../../../../../index.html'));
      
      })
      .catch(error => {
        res.sendFile(__dirname+ '/public/signup/signuperror.html');
        
      });
  },
  
  list(req, res) {
    return User
      .findAll({
        
        raw:true,
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