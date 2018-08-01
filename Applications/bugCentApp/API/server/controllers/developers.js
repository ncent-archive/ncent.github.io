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
        return dev
          .update({
            Bug: req.body.Bug || dev.Bug,
          })
          .then(() => res.status(200).send(dev))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};