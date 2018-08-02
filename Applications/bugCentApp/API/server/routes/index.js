const sponsorsController = require('../controllers').sponsors;
const programsController = require('../controllers').programs;
const bugsController = require('../controllers').bugs;
const devsController = require('../controllers').developers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sponsors API!',
  }));

  app.post('/api/sponsor', sponsorsController.create); //works
  app.get('/api/sponsor', sponsorsController.list); //works for listing single one
  app.get('/api/sponsor/:sponsor_uuid', sponsorsController.retrieve); //works and lists programs
  app.put('/api/sponsor/:sponsor_uuid', sponsorsController.update); //works

  app.post('/api/sponsor/:sponsor_uuid/items', programsController.create); //works
  app.get('/api/sponsor/:sponsor_uuid/items', programsController.list);//works
  app.get('/api/program/:program_uuid', programsController.retrieve);//works and shows bugs array
  app.put('/api/program/:program_uuid', programsController.update); //works but we prob want functionality to delete a program
  
  app.post('/api/program/:program_uuid/items', bugsController.create); //works
  app.get('/api/program/:program_uuid/items', bugsController.list); //sequelize eager loading error
  app.get('/api/bug/:bug_uuid', bugsController.retrieve); 
  app.put('/api/bug/:bug_uuid', bugsController.update);//probably want functionality to delete a bug
  
  app.post('/api/bug/:bug_uuid/items', devsController.create); //next in line
  app.get('/api/bug/:bug_uuid/items', devsController.list); //sequelize eager loading error
  app.get('/api/developer/:developer_uuid', devsController.retrieve); 
  app.put('/api/developer/:developer_uuid', devsController.update);

  app.put('/api/developer/:developer_uuid/:bugs_uuid', devsController.addBg);
  app.put('/api/bug/:bug_uuid/:dev_uuid', bugsController.addDev);
  // app.post('/api/developer/:developer_uuid/items', developersController.create);
  // app.get('/api/bug/:bug', developersController.list);
  // app.get('/api/developers/:developer_uuid', developersController.list);
  // app.put('/api/developers/:developers_uuid', developersController.update);
  // app.post('/api/developers/:developers_uuid/items', bugsController.create);
  // app.get('/api/developers/:developers_uuid/items', bugsController.list);
};