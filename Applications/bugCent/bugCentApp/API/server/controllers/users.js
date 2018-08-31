const User = require('../models').User;
const bugUser = require('../models').bugUser;
const bcrypt = require('bcrypt');
const path = require('path');
const ncentSDK = require('../../../../../../SDK/source/');
const ncentSdkInstance = new ncentSDK();
const StellarSdk = require('stellar-sdk');
let bugCent_keypair;
let initialized = false; //CHANGE TO FALSE LATER
let tokenid;
/*Params: 
    - recipientArr: the array of usernames that resulted in parsing the input from the transfer form. 
    - max: max number of times to call the function (number of users to send tokens to)
    - i: counter to ensure we don't call function when we have already sent tokens to all desired users
  About: this function is a recursive helper used to transfer tokens to multiple people from a single 
  transaction form.
*/
function sendToMultipleHelper(recipientArr, recipientUsername, senderPrivateKey, amount, i, max){
  if(i >= max) return;
    return User
        .findOne({ where: { username: recipientUsername } })
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
/*This function, called at the first API call, initializes the sponsor wallet address for bugCent, which
  will hold all the bugCent in the beginning. Then, it stamps bugCent from NCNT with that wallet address and 
  records the value of bugCent's token ID, which is used to process transactions.
*/
function bugCentInit(){
    return new Promise(function(resolve, reject) {
      resolve(ncentSdkInstance.createWalletAddress());
      reject('nothing done');
    })
    .then(function(keypair){
      bugCent_keypair = keypair;
      return new Promise(function(resolve, reject) {
         ncentSdkInstance.stampToken(bugCent_keypair.publicKey(), 'bugCent', 10000, '2021', resolve, reject);
      })
      .then(response =>{
        console.log(response);
        tokenid = response.data["token"]["uuid"];
        initialized = true;
      })
      .catch(error=> console.log('Error initalizing bugcent' + error));
      
    })
    .catch(error=> console.log('Error creating bugCent wallet keypair' + error));
}
module.exports = {
  /*This function handles transactions. It splits the form input into an array of usernames to send tokens
    to, then transfers bugCent from the sender to each user (with the help of sendToMultipleHelper), then it 
    updates the sender's balance.
  */
  transfer(req, res){
    let recipientArr = req.body.username.split(", ");
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
              .catch(error => console.log('Sender not updated: ' + error));
            })
          })
          .catch(error=> console.log('Recipient not updated: '+ error));
        })
        .catch(error=> console.log('Something is not right with transfer: ' + error));
      })
      .catch(error=> console.log('Something is not right with finding user: ' + error))
    
        

  },
  /*This function is called upon signing up. It created a user by first creating their wallet address
    then setting all of the user's attributes to the form inputs, then seeding the user with 100 bugCent
    if they are a company, and finally redirecting them to a login screen.
  */
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
            .catch(error => console.log('Error updating balance: ' + error));
              
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
  /*This function logs the user in, meaning it initializes the session for the user if they enter the correct
    combination of username and password. Uses bcrypt function to check if the user entered correct password
    since the password is encrypted in the database.
  */
  getUser(req, res){
    let username = req.body.username;
    let password = req.body.password;

      User.findOne({ where: { username: username } }).then(function (user) {
          if (!user) {
              res.sendFile(__dirname + '/public/login/loginerror.html');
          } else if (!bcrypt.compareSync(password, user.password)) {
              res.sendFile(__dirname + '/public/login/loginerror.html');
          } else {
              req.session.user = user;
              res.sendFile(__dirname + '/public/index.html');
             
          }
      });
  },
  /*This update function is currently never used, but in the future could be integrated with the user's 
    dashboard so that that can update their personal information. 
  */
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
  },
  transferPage(req, res){
      if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname+ '/public/transfer.html');
      } else {
        res.sendFile(__dirname+ '/public/login/login.html');
      }    
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
      res.sendFile(__dirname + '/public/report/report.html');
    } else {
        res.redirect('/login');
    }
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
  }
  
};