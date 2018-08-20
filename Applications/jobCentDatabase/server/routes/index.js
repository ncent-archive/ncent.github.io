const usersController = require('../controllers').users;

module.exports = (app) => {
    app.post('/jobCent/users', usersController.create);
    app.get('/jobCent/users', usersController.list);
    app.get('/jobCent/users/:id', usersController.retrieve);
};