const tokentypesController = require('../controllers').tokentypes;
const transactionsController = require('../controllers').transactions;
const walletsController = require('../controllers').wallets;
const balancesController = require('../controllers').balances;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the NCNT API!',
    }));
    app.post('/api/tokentypes', tokentypesController.create);
    app.get('/api/tokentypes', tokentypesController.list);
    app.get('/api/tokentypes/:tokentype_uuid', tokentypesController.retrieve);
    app.put('/api/tokentypes/:tokentype_uuid', tokentypesController.update);
    //destroy needed? (since for destroyToken - it's just setting expiry date to 0)
    app.post('/api/tokentypes/:tokentype_uuid/items', transactionsController.create);
    app.get('/api/tokentypes/:tokentype_uuid/items', transactionsController.list);

    app.post('/api/wallets', walletsController.create);
    app.get('/api/wallets', walletsController.list);
    app.get('/api/wallets/:wallet_uuid', walletsController.retrieve);

    app.post('/api/wallets/:wallet_uuid/items', balancesController.create);
    app.get('/api/wallets/:wallet_uuid/items', balancesController.list);
    app.get('/api/wallets/:wallet_uuid/:uuid', balancesController.retrieve);
    app.put('/api/wallets/:wallet_uuid/:uuid', balancesController.update);
    // For any other request method on transactions, we're going to return "Method Not Allowed"
    app.all('/api/todos/:todoId/items', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
    }));
};

// post the wallet, post the balance, post the tokenType