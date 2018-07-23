const Transaction = require('../models').Transaction;
const Wallet = require('../models').Wallet;

function updateBalance(req, res, data, to) {
  let phrase;
  let address;
  let amount;
  if (to) {
    phrase = "sender";
    address = req.body.fromAddress;
    amount = - parseInt(req.body.amount, 10);
  } else {
    phrase = "receiver";
    address = req.body.toAddress;
    amount = parseInt(req.body.amount, 10);
  };
  Wallet
    .findAll({
      where: {
        wallet_uuid: address,
        tokentype_uuid: req.params.tokentype_uuid,
      }
    })
    .then(wallets => {
      if (!wallets || wallets.length < 1 ) {
        return res.status(404).send({
          message: 'Balance for Wallet Not Found',
        });
      }
      wallets[0].update({
        balance: parseInt(wallets[0].balance, 10) + amount,
      })
      .then((wallets) => {data[phrase] = wallets})  // Send back the updated wallet.
      .catch((error) => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error))
}
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
        updateBalance(req, res, data, true);
      })
      .then(() => {
        updateBalance(req, res, data, false);
      })
      .then(() => {
        res.status(200).send(data);
      })
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