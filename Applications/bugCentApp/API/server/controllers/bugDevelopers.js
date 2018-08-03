const bugDeveloper = require('../models').bugDevelopers;
const Developer = require('../models').developer;
const Bug = require('../models').bug;
module.exports = {
  createNewDev(req, res) {
    return bugDeveloper
      .create({
        bug_uuid: req.params.bug_uuid,
        developer_uuid: req.params.developer_uuid
      })
      .then(dev => res.status(201).send(dev))
      .catch(error => res.status(400).send(error));
  },
  createNewBug(req, res) {
    return bugDeveloper
      .create({
        bug_uuid: req.params.bug_uuid,
        developer_uuid: req.params.developer_uuid
      })
      .then(bug => res.status(201).send(bug))
      .catch(error => res.status(400).send(error));
  },
  listDevs(req, res) {
    return bugDeveloper
      .findById(req.params.bug_uuid, {
        include: [{
          model: Developer,
        //   as: 'devsWorkingOn',
        }],
      })
      .then(devs => res.status(200).send(devs))
      .catch(error => res.status(400).send(error));
  },
  listBugs(req, res) {
    return bugDeveloper
      .findById(req.params.developer_uuid, {
        // include: [{
        //   model: bugDeveloper,
        //   as: 'bugsInProgress',
        // }],
      })
      .then(bugs => res.status(200).send(bugs))
      .catch(error => res.status(400).send(error));
  },
};