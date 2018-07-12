const Transaction = require('../models').Transaction;

module.exports = {
  create(req, res) {
    return Transaction
      .create({
        amount: req.body.amount,
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        tokentype_uuid: req.params.tokentype_uuid
      })
      .then(transaction => res.status(201).send(transaction))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Transaction
      .findAll({
      })
      .then(transactions => res.status(200).send(transactions))
      .catch(error => res.status(400).send(error));
  },
};