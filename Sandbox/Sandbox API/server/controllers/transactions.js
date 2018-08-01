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
      .then(transaction => {
        data = {txn: transaction}
        Wallet
          .findAll({
            where: {
              wallet_uuid: req.body.fromAddress,
              tokentype_uuid: req.params.tokentype_uuid,
            }
          })
          .then(function(wallets){
            if (!wallets || wallets.length < 1 ) {
              return res.status(404).send({
                message: 'Balance for Wallet Not Found',
              });
            }
<<<<<<< HEAD
            wallets[0].update({
                balance: parseInt(wallets[0].balance, 10) + parseInt(req.body.amount, 10),
=======
            if (parseInt(senderWallets[0].balance, 10) - parseInt(req.body.amount, 10) < 0 ) {
              return res.status(403).send({
                message: 'Inadequate Balance',
              });
            }
            senderWallets[0].update({
                balance: parseInt(senderWallets[0].balance, 10) - parseInt(req.body.amount, 10),
>>>>>>> 4fa2d91b14b83ddf8000a3010f09726a4974ca9b
              })
              .then((wallets) => {
                data["sender"] = wallets[0]
                Wallet
                  .findAll({
                    where: {
                      wallet_uuid: req.body.toAddress,
                      tokentype_uuid: req.params.tokentype_uuid,
                    }
                  })
                  .then(function(wallets) {
                    if (!wallets || wallets.length < 1 ) {
                      return res.status(404).send({
                        message: 'Balance for Wallet Not Found',
                      });
                    }
                    wallets[0].update({
                        balance: parseInt(wallets[0].balance, 10) + parseInt(req.body.amount, 10),
                      })
                      .then((wallets) => {
                        data["receiver"] = wallets[0]
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