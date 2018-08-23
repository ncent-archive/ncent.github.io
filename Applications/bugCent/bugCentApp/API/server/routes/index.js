const usersController = require('../controllers').users;
const bugsController = require('../controllers').bugs;
const bugUsersController = require('../controllers').bugUsers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bugCent API!',
  }));

  app.post('/api/user', usersController.create); //1
  app.get('/api/user', usersController.list); // 2
  app.get('/api/user/:user_uuid', usersController.retrieve); //3
  app.get('/dashboard/reports', usersController.retrieveWithUser); //3
  app.put('/api/user/:user_uuid', usersController.update); //4

  app.post('/api/bug', bugsController.create); //5
  app.get('/api/bug', bugsController.list); //6
  app.get('/api/bug/:bug_uuid', bugsController.retrieve); //7
  app.put('/api/bug/:bug_uuid', bugsController.update);// 8

  app.post('/api/bugUser', bugUsersController.create);
  app.post('/api/bug/:bug_uuid/user/:user_uuid', bugUsersController.createNew); //5
  //app.get('/update/:bug_uuid', bugsController.updateBug);

  app.get('/signup', usersController.getPage);
  app.post('/signup', usersController.create);
  app.get('/', usersController.getRedirect);
  app.get('/login', usersController.getLogIn);
  app.post('/login', usersController.getUser);
  app.get('/dashboard', usersController.dashboard);
  app.get('/dashboard/report', usersController.report);
  app.get('/updatebug.html?:bug_uuid', usersController.updateBugPage);
  app.get('/logout', usersController.logOut);
  app.post('/transfer', usersController.transfer);
};