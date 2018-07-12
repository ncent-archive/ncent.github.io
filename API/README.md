DETAILS in Version 1.0.0

STRUCTURAL ASSUMPTIONS
1. Fungible tokens for all stamped token types
2. Database includes wallet (which has balances for each coin type) and token type (with transaction history under them)
3. Same Expiration Date for all tokens of one stamped token type

IMPLEMENTATION
1. NodeJS and PostgreSQL with Sequelize
2. NCNT is an entry under TokenType but is dealt with carefully

Resources
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
