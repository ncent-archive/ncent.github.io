const bugUser = require('../models').bugUser;
const User = require('../models').User;
const Bug = require('../models').Bug;
module.exports = {
  // updateBug(req, res){
  //   bugUser
  //   .findAll({where: {user_uuid:req.session.user.uuid}, attributes: ['bug_uuid']})
  //   .then(bugs=>{
  //     for(bug in bugs){
  //       Bug.findById(bugs[bug]).then(b =>{
  //         if(req.body.name == b.name){
  //           b.update req.body.status;
  //         }
  //       })
  //     }
  //   })
  // },
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
    let bugid;
    console.log(req.session.user);
    Bug
    .create({
      name: req.body.name,
      description: req.body.description
    })
    .then(bug => {
      bugid = bug.uuid;
      return bugUser
        .create({
          bug_uuid: bugid,
          user_uuid: req.session.user.uuid
        })
        .then(buguser => {
          console.log("bugMade")
          User.findOne({where: {name: req.body.companyName}, attributes:['uuid']})
          .then(company=>{
            return bugUser
              .create({
                bug_uuid: bugid,
                user_uuid: company.dataValues.uuid
                })
              .then(userbug=>{
               
                  if (req.session.user && req.cookies.user_sid) {
                       //res.render('dashboard', )
                        res.redirect('/dashboard'); 
                  } 
                  else {
                        res.redirect('/login');
                  }
              })  
              .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
            })
            .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
          })
          .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
    })
    .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
    
  }
};