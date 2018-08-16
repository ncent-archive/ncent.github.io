# Details in Version 1.0.0

## Introduction
The Sandbox API allows you to run a server that mimics the API to the Core but stores the information on the tokentypes, transactions and wallets on a (PostgreSQL) database. It can receive any request detailed in Sandbox API/server/route/index.js. The handling of the requests are detailed in the files under Sandbox API/server/controllers. The database schema and migrations are handled in Sandbox API/server/models and Sandbox API/server/migrations respectively. Sandbox API/server/config/config.json handles the location and details of the database. Check Sandbox API/package.json for the detailed dependencies.

## Installation
#### Running Locally:
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

#### 5. Install the SDK to communicate with the Sandbox
While not necessary, we highly recommend you communicate with our API through our much easier to use software development kit. To do so, create a new folder for your application and in the folder run 
``` shell
npm init -y
```
to create a new package.json file. Then, install the SDK
``` shell
npm i ncent-sdk-public
```

#### 6. Set up Sandbox enviroment database
Open PSQL shell and log in with the permissions you set up in step 1. List all the databases with the following command
``` shell
\l
```
Create a new database for development
``` shell
CREATE DATABASE “ncnt-dev”
```



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
