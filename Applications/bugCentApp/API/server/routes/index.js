const sponsorsController = require('../controllers').sponsors;
const programsController = require('../controllers').programs;
// const bugsController = require('../controllers').bugs;
// const developersController = require('../controllers').developers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sponsors API!',
  }));

  app.post('/api/sponsor', sponsorsController.create);
  app.get('/api/sponsor', sponsorsController.list); 
  app.get('/api/sponsor/:sponsor_uuid', sponsorsController.retrieve);
  app.put('/api/sponsor/:sponsor_uuid', sponsorsController.update); //should you be able to update programs
  //app.post('/api/sponsor/:sponsor_uuid/items', programsController.create);
  //app.get('/api/tokentypes/:sponsor_uuid/items', programsController.list);

  app.post('/api/program/:sponsor_uuid', programsController.create);
 // app.get('/api/programs', programsController.list);
  // app.get('/api/programs/:program_uuid', programsController.list);
  // app.put('/api/sponsor/:program_uuid', programsController.update);
  // app.post('/api/tokentypes/:program_uuid/items', bugsController.create);
  // app.get('/api/tokentypes/:program_uuid/items', bugsController.list);

  // app.post('/api/bugs', bugsController.create);
  // app.get('/api/bugs', bugsController.list);
  // app.get('/api/bugs/:bug_uuid', bugsController.list);
  // app.put('/api/bugs/:bug_uuid', bugsController.update);
  // app.post('/api/bugs/:bug_uuid/items', developersController.create);
  // app.get('/api/bugs/:bug_uuid/items', developersController.list);

  // app.post('/api/developers', developersController.create);
  // app.get('/api/developers', developersController.list);
  // app.get('/api/developers/:developer_uuid', developersController.list);
  // app.put('/api/developers/:developers_uuid', developersController.update);
  // app.post('/api/developers/:developers_uuid/items', bugsController.create);
  // app.get('/api/developers/:developers_uuid/items', bugsController.list);
};