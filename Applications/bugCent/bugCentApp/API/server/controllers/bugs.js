const Bug = require('../models').Bug;
const bugUser = require('../models').bugUser;

module.exports = {
  create(req, res) {
    return Bug
      .create({
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
      })
      
      .then(bug => res.status(201).send(bug))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Bug
      .findAll({
        include: [{
          model: bugUser,
          as: 'users',
          attributes: ['user_uuid']
        }],
      })
      .then(bug => res.status(200).send(bug))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Bug
      .findById(req.params.bug_uuid, {
        include: [{
          model: bugUser,
          as: 'users',
          attributes: ['user_uuid']
        }],
      })
      .then(bug => {
        if (!bug) {
          return res.status(404).send({
            message: 'Bug Not Found',
          });
        }
        return res.status(200).send(bug);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Bug
      .findById(req.params.bug_uuid, {
        include: [{
          model: bugUser,
          as: 'users',
        }],
      })
      .then(bug => {
        if (!bug) {
          return 
             res.sendFile(__dirname + '/public/errorpage.html');
          
        }
        return bug
          .update({
           name: req.body.name || bug.name,
           description: req.body.description || bug.description,
           status: req.body.status || bug.status
          })
          .then(bug =>{
            res.sendFile(__dirname + '/public/index.html');
          })  
          .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
      })
      .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
  }
};