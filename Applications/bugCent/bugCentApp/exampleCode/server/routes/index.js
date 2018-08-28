const bugsController = require('../controllers').bugs;


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bugCent API!',
    }));

    app.post('/api/bug', bugsController.create); 
};