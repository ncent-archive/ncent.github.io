const Bug = require('../models').bug;
const Developer = require('../models').Developer;

module.exports = {
  create(req, res) {
    return Developer
      .create({
        name: req.body.name,
        uuid: req.body.uuid,
        email: req.body.email
      })
      .then(dev => res.status(201).send(dev))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Developer
      .findAll({
        include: [{
          model: 'bugDevelopers',
          as: 'bugs',
        }],
      })
      .then(dev => res.status(200).send(dev))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Developer
      .findById(req.params.developer_uuid, {
        include: [{
          model: 'bugDevelopers',
          as: 'bugs',
        }],
      })
      .then(dev => {
        if (!dev) {
          return res.status(404).send({
            message: 'Dev Not Found',
          });
        }
        return res.status(200).send(dev);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Developer
      .findById(req.params.developer_uuid, {
        include: [{
          model: 'bugDevelopers',
          as: 'bugs',
        }],
      })
      .then(dev => {
        if (!dev) {
          return res.status(404).send({
            message: 'Dev Not Found',
          });
        }
        // var bugArray = bugDeveloper.findById(dev.bug_uuid).then(function(bugs) {
        //   if (!bugs) {
        //     return 'not find';
        //   }
        //   return bugs;
        // });
        // bugArray.update
        return dev
        .find
          .update({
            Bug: req.body.Bug || dev.Bug,
          })
          .then(() => res.status(200).send(dev))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  addBg(req, res){
    return Bug
    .findById(req.params.dev_uuid, {
      include: [{
        model: bugDeveloper,
        as: 'bugs',
      }],
    })
    .then(dev => {
      if(!dev){
        return res.status(404).send({
          message: 'Dev Not Found',
        })
      }
      dev.addBug(findById(req.params.bug_uuid).then(function(bug){
        if(!bug) return res.status(404).send({
          message: 'Bug Not Found',
        })
        return bug;
        })
      )
    })
    .catch((error) => res.status(400).send(error));
  }
};