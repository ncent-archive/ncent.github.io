const Transaction = require('../models').Transaction;
const Wallet = require('../models').Wallet;

module.exports = {
  create(req, res) {
    let data;
    Transaction
      .create({
        amount: req.body.amount,
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        tokentype_uuid: req.params.tokentype_uuid
      })
      .then(function(transaction) {
        data = {txn: transaction}
        Wallet.findAll({
            where: {
              wallet_uuid: req.body.fromAddress,
              tokentype_uuid: req.params.tokentype_uuid,
            }
          })
          .then(function(senderWallets) {
            if (!senderWallets || senderWallets.length < 1 ) {
              return res.status(404).send({
                message: 'Balance for Wallet Not Found',
              });
            }
            if (parseInt(senderWallets[0].balance, 10) - parseInt(req.body.amount, 10) < 0 ) {
              return res.status(403).send({
                message: 'Inadequate Balance',
              });
            }
            senderWallets[0].update({
                balance: parseInt(senderWallets[0].balance, 10) - parseInt(req.body.amount, 10),
              })
              .then(function(updatedSdrWallets) {
                data["sender"] = updatedSdrWallets
                Wallet.findAll({
                    where: {
                      wallet_uuid: req.body.toAddress,
                      tokentype_uuid: req.params.tokentype_uuid,
                    }
                  })
                  .then(function(receiverWallets) {
                    if (!receiverWallets || receiverWallets.length < 1 ) {
                      return res.status(404).send({
                        message: 'Balance for Wallet Not Found',
                      });
                    }
                    receiverWallets[0].update({
                        balance: parseInt(receiverWallets[0].balance, 10) + parseInt(req.body.amount, 10),
                      })
                      .then(function(updatedRecWallets) {
                        data["receiver"] = updatedRecWallets
                        //console.log(updatedRecWallets);
                        return res.status(200).send(data);
                      })  // Send back the updated wallet.
                      .catch((error) => res.status(406).send(error));
                  })
                  .catch(error => res.status(405).send(error))
              })  // Send back the updated wallet.
              .catch((error) => res.status(407).send(error));
          })
          .catch(error => res.status(402).send(error))
      })
      .catch(error => res.status(401).send(error));
    },
  list(req, res) {
    return Transaction
      .findAll({
      })
      .then(transactions => res.status(200).send(transactions))
      .catch(error => res.status(400).send(error));
  },
};