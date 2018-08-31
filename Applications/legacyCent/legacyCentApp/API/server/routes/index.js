const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the legacyCent API!',
  }));

  app.post('/api/user', usersController.create); //1
  app.get('/api/user', usersController.list); // 2
  app.get('/api/user/:user_uuid', usersController.retrieve); //3

  app.get('/pledge', usersController.getPage);
  app.get('/pledge/:user_uuid', usersController.getPageWithReferral);
  app.post('/pledgeyourself', usersController.create);
  app.post('/pledgeyourself/:user_uuid', usersController.createWithReferral);
  app.get('/', usersController.getRedirect);
  
  
};