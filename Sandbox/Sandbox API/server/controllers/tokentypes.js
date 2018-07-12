const TokenType = require('../models').TokenType;
const Transaction = require('../models').Transaction;
module.exports = {
  create(req, res) {
    return TokenType
      .create({
        Name: req.body.Name,
        ExpiryDate: req.body.ExpiryDate,
        sponsor_uuid: req.body.sponsor_uuid,
        totalTokens: req.body.totalTokens,
        // ProvenanceLength: req.body.ProvenanceLength,
        // Lambda: req.body.Lambda,
      })
      .then(tokentype => res.status(201).send(tokentype))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return TokenType
      .findAll({
        include: [{
          model: Transaction,
          as: 'transactions',
        }],
      })
      .then(tokentypes => res.status(200).send(tokentypes))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return TokenType
      .findById(req.params.tokentype_uuid, {
        include: [{
          model: Transaction,
          as: 'transactions',
        }],
      })
      .then(tokentype => {
        if (!tokentype) {
          return res.status(404).send({
            message: 'TokenType Not Found',
          });
        }
        return res.status(200).send(tokentype);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return TokenType
      .findById(req.params.tokentype_uuid, {
        include: [{
          model: Transaction,
          as: 'transactions',
        }],
      })
      .then(tokentype => {
        if (!tokentype) {
          return res.status(404).send({
            message: 'TokenType Not Found',
          });
        }
        return tokentype
          .update({
            ExpiryDate: req.body.ExpiryDate || tokentype.ExpiryDate,
          })
          .then(() => res.status(200).send(tokentype))  // Send back the updated tokentype.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};