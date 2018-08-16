# nCent Sandbox API

- [Installation](#installation)
- [Endpoint Documentation](#endpoints-documentation)

## Introduction
The Sandbox API allows you to run a server that mimics the API to the Core but stores the information on the tokentypes, transactions and wallets on a (PostgreSQL) database. It can receive any request detailed in Sandbox API/server/route/index.js. The handling of the requests are detailed in the files under Sandbox API/server/controllers. The database schema and migrations are handled in Sandbox API/server/models and Sandbox API/server/migrations respectively. Sandbox API/server/config/config.json handles the location and details of the database. Check Sandbox API/package.json for the detailed dependencies.

## Installation
### Running Locally:
If you want to set up a local instance of the Sandbox API and database to test and develop your app without publishing data to our centralized database, follow these instructions. We highly recommend developing locally as it will give you automony over your API calls and allow you to easilly manage your databases.

#### 1. Set up PostgreSQL
Use [this resource](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) to also gain access to the PSQL shell terminal. Set defaults as follows: *port=5432, password=”dickey”, user=”postgres”*

#### 2. Download Node.js
Download Node [here](https://nodejs.org/en/download/) and run the following commands in a terminal window to make sure the downloads were successful
``` shell
npm -v
node -v
```
#### 3. Clone the nCent public repository
Run the following command in a terminal window to clone the local repository.
``` shell
git clone https://github.com/ncent/ncent.github.io.git
```

#### 4. Enter the new repository and install the node dependencies
``` shell
cd ncent.github.io
cd Sandbox/Sandbox\ API
npm install
```


#### 5. Set up Sandbox enviroment database
Open a **PSQL shell** and log in with the permissions you set up in step 1. List all the databases with the following command
``` shell
\l
```
Create a new database for development
``` shell
CREATE DATABASE “ncnt-dev”
```
Now connect to your database
``` shell
\connect “ncnt-dev”
```
As a check, return to your Sandbox folder in the local repository and look at the file **Sandbox/Sandbox\ API/config/config.json** and make sure that your information in the “development” object matches your setup in PostgreSQL. If not, edit the development object.  
  
Now, we migrate the schema into the database. In your **terminal shell**, navigate to **server** under **Sandbox\ API** and run the following command
``` shell
node_modules/.bin/sequelize db:migrate
```
Once completed, go back to your PSQL shell and run the following command to make sure the tables migrated successfully
```shell
\dt
```
You should see 4 tables: *SequalizeMeta, TokenTypes, Transactions, and Wallets*. Now type in your PSQL shell **select * from “table_name”** to see that your table is empty. For example
```shell
SELECT * FROM "Wallets";
```

#### 6. Run The Sandbox and Test
Now you should have the Sandbox and API set up locally. From your terminal, in **server** under **Sandbox\ API** run the following command
```shell
npm run start:dev
```
you should see a lot of text appear on the screen to indicate that the Sandbox API is up and running. If you get any errors, don't fear, type
```shell
rs
```
and they should go away. If you want to test that the API is running properly from the SDK, go to the SDK directory in your local git nCent repository, find the test file, and run 
```shell
node test.js
```
Checking the tables again in the database, you should see them populated. To clear the database, type the following command from **server** under **Sandbox\ API**
```shell
node_modules/.bin/sequelize db:migrate:undo:all
```
to revert your migration and
```shell
node_modules/.bin/sequelize db:migrate
```
to migrate again. Your tables should now be empty again. You can now use our SDK to interact with the API or interact with the API directly, though we highly recommend applications use our SDK as it has more or less all the same functionality as the API with much simpler usage and implementation. To see how to use the SDK to talk to our API endpoints, take a look at [our SDK documentation](https://github.com/ncent/ncent.github.io/tree/master/SDK).


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
