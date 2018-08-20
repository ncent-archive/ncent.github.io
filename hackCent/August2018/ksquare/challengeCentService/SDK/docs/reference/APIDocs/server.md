---
title: Server
---

## Overview

The `server` object handles a network connection to the nCent server.  It provides methods that makes requests to that nCent server easy.

It is important to note that `server` methods query [nCent endpoints](https://www.stellar.org/developers/reference/).  Each method points to a particular set of endpoints -- for example, `accounts()` queries [`accounts_all`](https://www.stellar.org/developers/horizon/reference/accounts-all.html) or [`accounts_single`](https://www.stellar.org/developers/horizon/reference/accounts-single.html).  In order to specify exactly which of the two, more methods are provided after calling `accounts()`.  For more, please see the documentation for [`CallBuilder`](./call_builder.md) and for each of the methods belonging to `server`.

## Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `object` | No | The server configuration |
| `config.secure` | `boolean` | No | If `true`, establishes a connection with HTTPS instead of HTTP.  Defaults `false`.|
| `config.hostname` | `string` | No | The hostname of the nCent server.  Defaults to `localhost`.|
| `config.port` | `integer` | No | The port of the nCent server to connect to.  Defaults to 3000.|

## Methods

| Method | Params | Description | Endpoints |
| --- | --- | --- | --- |
| `accounts` | None | Returns an `AccountCallBuilder` with methods to query account endpoints. | [`accounts_all`](https://stellar.org/developers/horizon/reference/accounts-all.html), [`accounts_single`](https://stellar.org/developers/horizon/reference/accounts-single.html)|
| `ledgers` | None | Returns a `LedgerCallBuilder` with methods to query ledger endpoints. | [`ledgers_all`](https://stellar.org/developers/horizon/reference/ledgers-all.html), [`ledgers_single`](https://stellar.org/developers/horizon/reference/ledgers-single.html) |
| `transactions` | None | Returns a `TransactionCallBuilder` with methods to query transaction endpoints. | [`transactions_all`](https://stellar.org/developers/horizon/reference/transactions-all.html), [`transactions_single`](https://stellar.org/developers/horizon/reference/transactions-single.html), [`transactions_for_account`](https://stellar.org/developers/horizon/reference/transactions-for-account.html), [`transactions_for_ledger`](https://stellar.org/developers/horizon/reference/transactions-for-ledger.html) |
| `operations` | None | Returns an `OperationsCallBuilder` with methods to query operation endpoints.| [`operations_all`](https://stellar.org/developers/horizon/reference/operations-all.html), [`operations_single`](https://www.stellar.org/developers/horizon/reference/operations-single.html), [`operations_for_account`](https://ncent.io), [`operations_for_transaction`](https://ncent.io), [`operation_for_ledger`](https://ncent.io)|
| `payments` | None | Returns a `PaymentCallBuilder` with methods to query payment endpoints. | [`payments_all`](https://ncent.io), [`payments_for_account`](https://ncent.io), [`payments_for_ledger`](https://ncent.io), [`payments_for_transactions`](https://ncent.io) |
| `effects` | None | Returns an `EffectCallBuilder` with methods to query effect endpoints.| [`effects_all`](https://ncent.io), [`effects_for_account`](https://ncent.io), [`effects_for_ledger`](https://ncent.io), [`effects_for_operation`](https://ncent.io), [`effects_for_transaction`](https://ncent.io) |
| `offers` | `resource`, `resourceParams` | Returns a `OfferCallBuilder` that queries the offer endpoint.  This requires "accounts" as the `resource` and the address of the account with the offers you're interested in as `resourceParams`. | [`offers_for_account`](https://ncent.io) |
| `orderbook` | `selling`, `buying` | Returns a `OrderbookCallBuilder` that queries the orderbook endpoint.  Requires the `Asset`s that others are `selling` or `buying` as parameters. | [`orderbook_details`](https://ncent.io), [`trades_for_orderbook`](https://ncent.io)  |


## Examples

```js
var ncentSDK = require('ncentSDK');
var server = new ncentSDK.Server('https://ncent.io');

server.accounts()
  ...
```