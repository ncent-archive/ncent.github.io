const Wallet = require('../models').Wallet;
const Balance = require('../models').Balance;

module.exports = {
  create(req, res) {
    return Wallet
      .create({
          uuid: req.body.uuid,
      })
      .then(wallet => res.status(201).send(wallet))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Wallet
      .findAll({
        include: [{
          model: Balance,
          as: 'balances',
        }],
      })
      .then(wallets => res.status(200).send(wallets))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Wallet
      .findById(req.params.wallet_uuid, {
        include: [{
          model: Balance,
          as: 'balances',
        }],
      })
      .then(wallet => {
        if (!wallet) {
          return res.status(404).send({
            message: 'Wallet Not Found',
          });
        }
        return res.status(200).send(wallet);
      })
      .catch(error => res.status(400).send(error));
  },
};