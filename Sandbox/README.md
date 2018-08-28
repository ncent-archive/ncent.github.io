# nCent Sandbox

- [Local Installation](#local-installation)
- [Endpoint Documentation](#endpoints-documentation)

## Introduction
The nCent Sandbox allows you to run a server that mimics the nCent Core Protocol. In its current stage, it stores the information on the tokentypes, transactions and wallets on a (PostgreSQL) database. 

The Sandbox API is detailed [here](https://github.com/ncent/ncent.github.io/blob/master/Sandbox/Sandbox%20API/server/routes/index.js). 

The request handling is implemented in the [controllers directory](https://github.com/ncent/ncent.github.io/tree/master/Sandbox/Sandbox%20API/server/controllers). 

The database schema and migrations are handled in the [models directory](https://github.com/ncent/ncent.github.io/tree/master/Sandbox/Sandbox%20API/server/models) and [migrations directory](https://github.com/ncent/ncent.github.io/tree/master/Sandbox/Sandbox%20API/server/migrations), respectively. 

The [config.json file](https://github.com/ncent/ncent.github.io/blob/master/Sandbox/Sandbox%20API/server/config/config.json) handles the location and details of the database. 

## Installation

Please follow [these instructions](https://github.com/ncent/ncent.github.io/blob/master/Sandbox/Sandbox%20API/README.md) to run an instance of the sandbox locally. 

We also have our own instance of the sandbox hosted on AWS. To access its APIs, simply add the routes detailed in the endpoints section below to the IP Address and port of our hosted instance: http://18.219.87.29:8010/api

## Endpoints Documentation

- [Get All Wallets](#get-all-wallets)
- [Get Specific Wallet](#get-specific-wallet)
- [Get Specific Wallet and Tokentype](#get-specific-wallet-and-tokentype)
- [Stamp Token](#stamp-token)
- [List Token Types](#list-token-types)
- [Specific Token Information](#specific-token-information)
- [Destroy Tokens](#destroy-tokens)
- [Transfer Tokens](#transfer-tokens)
- [List Token Transactions](#list-token-type-transactions)

- - - -

## Get All Wallets
#### `GET /wallets`
#### Description:
Retrieve information about all wallets.
#### Paramters:
None
#### Body:
None

- - - -
<br />

- - - -


## Get Specific Wallet 
#### `GET /wallets/{wallet_uuid}`
#### Description:
Retrieve information about a specific wallet
#### Parameters:
Name  | Type | Description
--- | --- | ---
wallet_uuid | String | Valid wallet public key
#### Body:
None

- - - -
<br />

- - - -


## Get Specific Wallet and Tokentype
#### `GET /wallets/{wallet_uuid}/{tokentype_uuid}`
#### Description:
Retrieve information about how much of a specific token a wallet holds
#### Parameters:
Name  | Type | Description
--- | --- | ---
wallet_uuid | String | Valid wallet public key
tokentype_uuid | String | Valid unique tokentype id
#### Body:
None

- - - -
<br />

- - - -

## Stamp Token
#### `POST /tokentypes`
#### Description:
Instantiate a new token type. In the current implementation creates new tokens from nothing. In production, one can only stamp existant nCent into a new token type.
#### Parameters:
None
#### Body:
Name  | Type | Description
--- | --- | ---
sponsor_uuid | String | Valid wallet public key of token sponsor
Name | String | Token Name
totalTokens | Int | Number of tokens to be stamped
ExpiryDate | Date Object | The expiration date of the tokens stamped into existance 

- - - -
<br />

- - - -

## List Token Types
#### `GET /tokentypes`
#### Description:
List all token types
#### Parameters:
None
#### Body:
None

- - - -
<br />

- - - -

## Specific Token Information
#### `GET /tokentypes/{tokentype_uuid}`
#### Description:
List information about a specific token type
#### Parameters:
Name  | Type | Description
--- | --- | ---
tokentype_uuid | String | Unique identifier for a specific token type
#### Body:
None

- - - -
<br />

- - - -

## Destroy Tokens
#### `PUT /tokentypes/{tokentype_uuid}`
#### Description:
List information about a specific token type
#### Parameters:
Name  | Type | Description
--- | --- | ---
tokentype_uuid | String | Unique identifier for a specific token type
#### Body:
Name  | Type | Description
--- | --- | ---
ExpiryDate | Date Object | Updated expiration date for a specific token type
signed | String | JSON string of signed message object

- - - -
<br />

- - - -

## Transfer Tokens
#### `POST /tokentypes/{tokentype_uuid}/items`
#### Description:
Transfer tokens from one account to another. Must be 
#### Parameters:
Name  | Type | Description
--- | --- | ---
tokentype_uuid | String | Unique identifier for a specific token type
#### Body:
Name  | Type | Description
--- | --- | ---
amount | Int | Amount of TokenType to transfer
fromAddress | String | Valid public key of sender
toAddress | String | Valid public key of receiver
signed | String | JSON string of signed message object
#### Response:
#### Possible Errors:

- - - -
<br />

- - - -

## List Token Type Transactions
#### `GET /tokentypes/{tokentype_uuid}/items`
#### Description:
List transaction history of a specific token type
#### Parameters:
Name  | Type | Description
--- | --- | ---
tokentype_uuid | String | Unique identifier for a specific token type
#### Body:
None

- - - -
<br />

- - - -


## Structural Assumptions
1. Fungible tokens for all stamped token types
2. Database includes wallet (which has balances for each coin type) and token type (with transaction history under them)
3. Same Expiration Date for all tokens of one stamped token type

## Implementation
1. NodeJS and PostgreSQL with Sequelize
2. NCNT is an entry under TokenType but is dealt with carefully

## Resources
1. TokenType:
	- Name
	- UUID
	- Expiry Date
	- Sponsor_UUID
	- Total Tokens Stamped

2. Transaction:
	- UUID
	- Amount
	- From Wallet Address
	- To Wallet Address
	- TokenType_UUID (Foreign Key)
 
3.  Wallet:
	- UUID
	- Wallet_UUID
	- Tokentype_UUID
	- Balance
