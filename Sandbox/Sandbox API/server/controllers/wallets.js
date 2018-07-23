const Wallet = require('../models').Wallet;

module.exports = {
  create(req, res) {
    return Wallet
      .create({
        wallet_uuid: req.body.wallet_uuid,
        tokentype_uuid: req.body.tokentype_uuid,
        balance: req.body.balance
      })
      .then(wallet => res.status(201).send(wallet))
      .catch(error => res.status(400).send(error));
  },
  listAll(req, res) {
    return Wallet
      .findAll({
      })
      .then(wallets => res.status(200).send(wallets))
      .catch(error => res.status(400).send(error));
  },
  listSome(req, res) {
    return Wallet
      .findAll({
        where: {
          wallet_uuid: req.params.wallet_uuid,
        }
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
  retrieve(req, res) {
    return Wallet
    .findAll({
      where: {
        wallet_uuid: req.params.wallet_uuid,
        tokentype_uuid: req.params.tokentype_uuid,
      }
    })
    .then(wallet => {
      if (!wallet || wallet.length < 1 ) {
        return res.status(404).send({
          message: 'Balance for Wallet Not Found',
        });
      }
      return res.status(200).send(wallet);
    })
  }
};