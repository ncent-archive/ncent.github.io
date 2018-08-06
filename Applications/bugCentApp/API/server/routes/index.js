const sponsorsController = require('../controllers').sponsors;
const programsController = require('../controllers').programs;
const bugsController = require('../controllers').bugs;
const devsController = require('../controllers').developers;
const bugDevController = require('../controllers').bugDevelopers;
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sponsors API!',
  }));

  app.post('/api/sponsor', sponsorsController.create); //1
  app.get('/api/sponsor', sponsorsController.list); // 2
  app.get('/api/sponsor/:sponsor_uuid', sponsorsController.retrieve); //3
  app.put('/api/sponsor/:sponsor_uuid', sponsorsController.update); //4

  app.post('/api/sponsor/:sponsor_uuid/items', programsController.create); //5
  app.get('/api/sponsor/:sponsor_uuid/items', programsController.list);//6
  app.get('/api/program/:program_uuid', programsController.retrieve);//7
  app.put('/api/program/:program_uuid', programsController.update); //8
  
  app.post('/api/program/:program_uuid/items', bugsController.create); //9
  app.get('/api/program/:program_uuid/items', bugsController.list); //10
  app.get('/api/bug/:bug_uuid', bugsController.retrieve); //11
  app.put('/api/bug/:bug_uuid', bugsController.update);// 12
  
  app.post('/api/developer', devsController.create); //13
  app.get('/api/developer', devsController.list); //14
  app.get('/api/developer/:developer_uuid', devsController.retrieve); 
  app.put('/api/developer/:developer_uuid', devsController.update);

  app.post('/api/bug/:bug_uuid/items/:developer_uuid', bugDevController.createNewDev); //5
  app.get('/api/bug/:bug_uuid/items', bugDevController.listDevs);//6

  app.post('/api/developer/:developer_uuid/:bug_uuid/items', bugDevController.createNewBug); //5
  app.get('/api/developer/:deverloper_uuid/items', bugDevController.listBugs);//6
  


  //TODO: functionality to delete a program
  //TODO: probably want functionality to delete a bug
  //TODO: functionality to delete a developer from a bug and vice versa
};