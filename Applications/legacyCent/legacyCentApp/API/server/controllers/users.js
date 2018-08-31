const User = require('../models').User;
const path = require('path');

function helper(next, points){
  if(next != null){
    return User
              .findById(next, {
                            
              })
              .then(father=>{
                  return father
                  .update({
                      username: father.username,
                      referredBy_uuid: father.referredBy_uuid,
                      email: father.email,
                      name: father.name,
                      points: father.points+points,
                  })
                  .then(father => {
                      next = father.referredBy_uuid;
                      points = points/2;
                      helper(next, points);
                  })
                  .catch(error=>console.log('error updating: '+error));
                            
              })
              .catch(error => console.log('something went wrong: ' + error));
  }
}
module.exports = {
  createWithReferral(req, res) {
    return User
    .create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        referredBy_uuid: req.params.user_uuid,
        points: 1,
    })
    .then(newbie =>{
        let next = newbie.referredBy_uuid;
        console.log("first" +  newbie.referredBy_uuid);
        let points = 0.5;
        let i = 1;
        while(next != null){
            console.log(i + '\n');
            return User
            .findById(next, {
                          
            })
            .then(father=>{
                return father
                .update({
                    username: father.username,
                    referredBy_uuid: father.referredBy_uuid,
                    email: father.email,
                    name: father.name,
                    points: father.points+points,
                })
                .then(father => {
                    console.log('ok');
                    next = father.referredBy_uuid;
                    points = points/2;
                    helper(next, points);
                })
                .catch(error=>console.log('error updating: '+error));
                          
            })
            .catch(error => console.log('something went wrong: ' + error));
                    
        }
        
        res.status(200).sendFile(path.resolve(__dirname + '../../../../../index.html'));
            
        })
        .catch(error => res.status(400).send(error));
   
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
        console.log(error);
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
  getRedirect(req, res){
    res.sendFile(path.resolve('__dirname' + '../../../../index.html'));
  },
  getPageWithReferral(req, res){
    res.sendFile(__dirname+ '/public/signup/signupreferral.html');
  },
  getPage(req, res){
    res.sendFile(__dirname+ '/public/signup/signup.html');
  }
};