# Details in Version 1.0.0

## Introduction
The Sandbox API allows you to run a server that mimics the API to the Core but stores the information on the tokentypes, transactions and wallets on a (PostgreSQL) database. It can receive any request detailed in Sandbox API/server/route/index.js. The handling of the requests are detailed in the files under Sandbox API/server/controllers. The database schema and migrations are handled in Sandbox API/server/models and Sandbox API/server/migrations respectively. Sandbox API/server/config/config.json handles the location and details of the database. Check Sandbox API/package.json for the detailed dependencies.

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
	- Value Escrow Rate (Initial value in NCNT obtained if redeemed)
	- Cashout Rate (Value in NCNT obtained if cashed out)
        - Provenance Length
        - Lambda (i.e Fraction referrer gets)
	- Transaction History (Table of Transactions)
	  - ID
	  - Amount
	  - From Wallet Address
	  - To Wallet Address
 
2.  Wallet:
	- ID
	- Token Types (Table of Token Types)
	  - UUID
	  - Amount
