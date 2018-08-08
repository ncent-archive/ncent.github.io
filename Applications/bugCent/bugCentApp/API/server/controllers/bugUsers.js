const bugUser = require('../models').bugUser;
const User = require('../models').User;
const Bug = require('../models').Bug;
module.exports = {
  createNew(req, res) {
    return bugUser
      .create({
        bug_uuid: req.params.bug_uuid,
        user_uuid: req.params.user_uuid
      })
      .then(dev => res.status(201).send(dev))
      .catch(error => res.status(400).send(error));
  },
  create(req, res){
  //  console.log(req)
    let userid;
    let bugid;
    Bug.create({
      name: req.body.name,
      description: req.body.description
    }).then(bug => {
      bugid = bug.uuid;
      User.findOne({where: {email: req.body.email}, attributes:['uuid']})
      .then(user =>{
        userid = user.dataValues.uuid;
        return bugUser
          .create({
            bug_uuid: bugid,
            user_uuid: userid
          })
          .then(buguser => {
            User.findOne({where: {name: req.body.companyName}, attributes:['uuid']})
            .then(company=>{
              return bugUser
              .create({
                bug_uuid: bugid,
                user_uuid: company.dataValues.uuid
              })
            })
           .then(userbug =>{
             User.findById(user.dataValues.uuid)
             .then(curruser =>{
               console.log(curruser.dataValues);
               console.log(req.cookies.user_sid);
                if (curruser.dataValues) {
                  res.sendFile(__dirname + '/public/dashboard/dashboard2.html');
                } else {
                  res.redirect('/login');
                }
             })
             .catch(error => res.status(400).send(error));
    
           })
          .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    //b.set(req.params.name, req.params.description);
    // Bug.findOne({where: {name: req.params.name}, attributes:['uuid']}).then(bug=>{
    //   bugid = bug.uuid;
    // })
    
    
    // User.findOne({where: {name: req.params.companyname, isCompany: true}}).then(company=>{
    //   companyid = company.uuid;
    // })
    
  }
};