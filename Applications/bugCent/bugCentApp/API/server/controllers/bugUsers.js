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
  /*This create function is what gets called when a user reports a bug.
    First, the bug is created with the name and description specified by the user reporting it.
    Then, a 'bugUser' instance is created to connect the user reporting the bug to the bug itself. This 
    instance stores both of their UUIDs. Then, we search for the company whose name matches the company name
    that the user specified and create another bugUser instance to connect the bug to the company. Then we 
    redirect the user to their homepage, where they should see the bug report they just made or we send 
    them to an error page if an error occurred.
  */
  create(req, res){
    let bugid;
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
          User.findOne({where: {name: req.body.companyName}, attributes:['uuid']})
          .then(company=>{
            return bugUser
              .create({
                bug_uuid: bugid,
                user_uuid: company.dataValues.uuid
                })
              .then(userbug=>{
               
                  if (req.session.user && req.cookies.user_sid) res.redirect('/dashboard'); 
                  
                  else res.redirect('/login');
                  
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