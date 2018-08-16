# Details in Version 1.0.0

## Introduction
The Sandbox API allows you to run a server that mimics the API to the Core but stores the information on the tokentypes, transactions and wallets on a (PostgreSQL) database. It can receive any request detailed in Sandbox API/server/route/index.js. The handling of the requests are detailed in the files under Sandbox API/server/controllers. The database schema and migrations are handled in Sandbox API/server/models and Sandbox API/server/migrations respectively. Sandbox API/server/config/config.json handles the location and details of the database. Check Sandbox API/package.json for the detailed dependencies.

## Installation
#### Running Locally:
If you want to set up a local instance of the Sandbox API and database to test and develop your app without publishing data to our centralized database, follow these instructions. We highly recommend developing locally as it will give you automony over your API calls and allow you to easilly manage your databases.

1. Set up PostgreSQL
Use [this resource](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) to also gain access to the PSQL shell terminal. Set defaults as follows: *port=5432, password=”dickey”, user=”postgres”*

2. Download Node.js
Download Node [here](https://nodejs.org/en/download/) and run the following commands to make sure the downloads were successful
``` shell
npm -v
node -v
```

Install NodeJS at https://nodejs.org/en/ and run npm install in ncent.github.io/Sandbox/Sandbox API/.

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
