const Bug = require('../models').Bug;
const User = require('../models').User;
const bugUser = require('../models').bugUser;
const bcrypt = require('bcrypt');
const path = require('path');
const ncentSDK = require('../../../../../../SDK/source/');
const ncentSdkInstance = new ncentSDK();
const StellarSdk = require('stellar-sdk');
let bugCent_publicKey;
let bugCent_privateKey;
let bugCent_keypair;
let initialized = false; //CHANGE TO FALSE LATER
let tokenid;
function sendToMultipleHelper(recipientArr, username, senderPrivateKey, amount, i, max){
  console.log('in helper');
  if(i >= max) return;
    return User
        .findOne({ where: { username: username } })
        .then(function (recipient) {
          return new Promise(function(resolve, reject) {
            ncentSdkInstance.transferTokens(StellarSdk.Keypair.fromSecret(senderPrivateKey), recipient.public_key, tokenid, amount, resolve, reject);
          })
          .then(function(){
            let newbalance = recipient.balance + Number(amount);
            return recipient
            .update({
              balance: newbalance
            })
            .then(function(){
                i++;
                return sendToMultipleHelper(recipientArr, recipientArr[i], senderPrivateKey, amount, i, max);
            })
            .catch(error=> console.log('recipient '+i+' not updated ' + error));
          })
          .catch(error=> console.log('Something is not right with transfer' + error));
        })
        .catch(error=> console.log('Something is not right with finding user' + error));
  
}
function bugCentInit(){
    return new Promise(function(resolve, reject) {
      resolve(ncentSdkInstance.createWalletAddress());
      reject('nothing done');
    })
    .then(function(keypair){
      bugCent_keypair = keypair;
      bugCent_publicKey = keypair.publicKey();
      bugCent_privateKey = keypair.secret();
      return new Promise(function(resolve, reject) {
         ncentSdkInstance.stampToken(bugCent_publicKey, 'bugCent', 10000, '2021', resolve, reject);
      })
      .then(response =>{
        tokenid = response.data["token"]["uuid"];
        initialized = true;
      })
      .catch(error=> console.log('Error initalizing bugcent' + error));
      
    })
    .catch(error=> console.log('Error creating bugCent wallet keypair' + error));
}
module.exports = {
  transferPage(req, res){
      if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname+ '/public/transfer.html');
      } else {
        res.sendFile(__dirname+ '/public/login/login.html');
      }    
  },
  transfer(req, res){
    let recipientArr = req.body.username.split(", ");
    console.log(req.body.username);
    console.log('recipient array: '+ recipientArr);
    let i = 0;
    if(req.body.amount > (req.session.user.balance* recipientArr.length)){
      res.sendFile(__dirname+ '/public/insufficientfunds.html');
      return;
    }
      return User
      .findOne({ where: { username: recipientArr[i] } })
      .then(function (recipient) {
        return new Promise(function(resolve, reject) {
          ncentSdkInstance.transferTokens(StellarSdk.Keypair.fromSecret(req.session.user.private_key), recipient.public_key, tokenid, req.body.amount, resolve, reject);
        })
        .then(function(){
          let newbalance = recipient.balance + Number(req.body.amount);
          return recipient
          .update({
            balance: newbalance
          })
          .then(function(){
              i++;
              console.log(i);
              console.log(recipientArr[i]);
              return sendToMultipleHelper(recipientArr, recipientArr[i], req.session.user.private_key, req.body.amount, i, recipientArr.length);
            
          })
          .then(function(){
            return User
            .findById(req.session.user.uuid, {})
            .then(sender =>{
              let newbalance = sender.balance - Number(req.body.amount * recipientArr.length);
              return sender
              .update({
                balance: newbalance,
              })
              .then(function(){
                if (req.session.user && req.cookies.user_sid) {
                  res.sendFile(__dirname + '/public/index.html');
                } else {
                    res.redirect('/login');
                }
              })
              .catch(console.log('sender not updated'));
            })
          })
          .catch(error=> console.log('recipient not updated '+ error));
        })
        .catch(error=> console.log('Something is not right with transfer' + error));
      })
      .catch(error=> console.log('Something is not right with finding user' + error))
    
        

  },
  updateBugPage(req, res){
    if(req.session.user.isCompany){
        res.sendFile(path.resolve(__dirname + '/public/updatebugcompany.html'));
    }
    else {
        res.sendFile(path.resolve(__dirname + '/public/updatebuguser.html'));
    }
    
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
    if(!initialized) bugCentInit();
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
    if(!initialized) bugCentInit();
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
    if(!initialized) bugCentInit();
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
    let publickey;
    let privatekey;
    return new Promise(function(resolve, reject) {
      resolve(ncentSdkInstance.createWalletAddress());
      reject('nothing done');
    })
    .then(function(response){
      keypair = response;
      return User
      .create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        balance: 0,
        public_key: keypair.publicKey(),
        private_key: keypair.secret(),
        isCompany: req.body.isCompany
      })
      .then(user => {
        if(user.isCompany){
          return new Promise(function(resolve, reject) {
            ncentSdkInstance.transferTokens(bugCent_keypair, user.public_key, tokenid, 100, resolve, reject);
          })
          .then(function(){
            return user
            .update({
              balance: 100,
            })
            .then(function(){
              req.session.user = user.dataValues;
              if (user.dataValues && req.cookies.user_sid) {
                res.sendFile(__dirname + '/public/index.html');
              } else {
                  res.redirect('/login');
              }
            })
            .catch(console.log('error updating balance'));
              
          })
          .catch(error => console.log(error));
        }
        else{
          if (user.dataValues && req.cookies.user_sid) {
            res.sendFile(__dirname + '/public/index.html');
          } else {
              res.redirect('/login');
          }
        }
        
      })
      .catch(error => {
        console.log(error);
        res.sendFile(__dirname+ '/public/signup/signuperror.html');
      });
    })
    .catch(error => console.log(error));
    
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
          .update({
            name: req.body.name || user.name,
          })
          .then(() => res.status(200).send(user))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};