const Balance = require('../models').Balance;

module.exports = {
  create(req, res) {
    return Balance
      .create({
        tokentype_uuid: req.body.tokentype_uuid,
        amount: req.body.amount,
        wallet_uuid: req.params.wallet_uuid
      })
      .then(transaction => res.status(201).send(transaction))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Balance
      .findAll({
      })
      .then(balances => res.status(200).send(balances))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Balance
      .findById(req.params.uuid)
      .then(balance => {
        if (!balance) {
          return res.status(404).send({
            message: 'Balance Not Found',
          });
        }
        return res.status(200).send(balance);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Balance
      .findById(req.params.uuid)
      .then(balance => {
        if (!balance) {
          return res.status(404).send({
            message: 'Balance Not Found',
          });
        }
        return balance
          .update({
            amount: req.body.amount,
          })
          .then(() => res.status(200).send(balance))  // Send back the updated tokentype.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};