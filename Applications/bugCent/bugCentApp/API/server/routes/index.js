const usersController = require('../controllers').users;
const bugsController = require('../controllers').bugs;
const bugUsersController = require('../controllers').bugUsers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bugCent API!',
  }));

  app.post('/api/user', usersController.create); 
  app.post('/signup', usersController.create);
  app.post('/transfer', usersController.transfer);
  app.post('/login', usersController.getUser);

  app.put('/api/user/:user_uuid', usersController.update); 

  app.get('/api/user', usersController.list); 
  app.get('/api/user/:user_uuid', usersController.retrieve); 
  app.get('/dashboard/reports', usersController.retrieveWithUser); 
  app.get('/signup', usersController.getPage);
  app.get('/', usersController.getRedirect);
  app.get('/login', usersController.getLogIn);
  app.get('/dashboard', usersController.dashboard);
  app.get('/dashboard/report', usersController.report);
  app.get('/updatebug.html?:bug_uuid', usersController.updateBugPage);
  app.get('/logout', usersController.logOut);
  app.get('/transferPage', usersController.transferPage);

  app.post('/api/bug', bugsController.create); 
  app.put('/api/bug/:bug_uuid', bugsController.update);
  app.get('/api/bug', bugsController.list); 
  app.get('/api/bug/:bug_uuid', bugsController.retrieve);

  app.post('/api/bugUser', bugUsersController.create);
  app.post('/api/bug/:bug_uuid/user/:user_uuid', bugUsersController.createNew); 

  
};