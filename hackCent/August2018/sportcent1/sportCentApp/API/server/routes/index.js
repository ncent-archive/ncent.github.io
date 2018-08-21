const usersController = require('../controllers').users;
const User = require("../models").User;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the sportCent API!',
    }));

    app.post('/api/user', usersController.create); //1
    // app.post('/api/user', (req, res, next) => {
    //     console.log(req.body);
    //     res.status(200).send({ message: req.body });
    // });
    // app.post('/api/user', (req, res, next) => {
    //     console.log("#### the params are: ");
    //     console.log(req.params);
    //     console.log("#### the body is: ");
    //     console.log(req.body);
    //     return User
    //         .create({
    //             username: req.body.username,
    //         })
    //         .then(user => {
    //             return new Promise(function (resolve, reject) {
    //                 ncentSdkInstance.createWalletAddress();
    //             })
    //                 .then(res.status.send(200))
    //                 .catch(error => console.log(error));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }); //1
    app.get('/api/user', usersController.list); // 2
    app.get('/api/user/:user_uuid', usersController.retrieve); //3
};

