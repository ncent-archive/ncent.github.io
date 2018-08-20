---
title: transactions()
---

## Overview

In order to read information about transactions from the nCent API, the server provides the `getAllTransactionHistory()` and the `getTokenTransactionHistory()` function. 

By default, these two commands provide access to the `transaction.js` nCent API endpoint.  By chaining other methods to it, you can reach other transaction endpoints.

## Methods

| Method |  Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `getAllTransactionHistory()` | `transaction.js` | walletAddress | See total outgoing and incoming transactions from your wallet for all tokens. |
| `getTokenTransactionHistory()` | `transaction.js` | walletAddress, tokenType | See total outgoing and incoming transactions from your wallet for one token. |


## Examples

```js
var ncentSDK = require('ncentSDK');
var server = new ncentSDK.Server('https://ncent.io');

server.transactions()
  .forAddress("GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K")
  .cursor("15530601746432")
  .call()
  .then(function (transactionResult) {
    console.log(transactionResult);
  })
  .catch(function (err) {
    console.error(err);
  })
```