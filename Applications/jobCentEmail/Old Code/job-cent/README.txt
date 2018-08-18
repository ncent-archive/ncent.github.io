######################### RUNNING #########################

Runs in the same way as ncent-game, check out the other README for how to do that:
https://github.com/thejnaut1/ncnt/blob/master/ncnt-game/AWS-HOWTO
Relevant sections are:
SET UP STELLAR IN DOCKER/INSTALL STELLAR (only if running internal stellar network)
RUNNING/INSTALL FRIENDBOT (only if running internal stellar network)
SET-UP NCNT GAME 

To run the Dev-Cent, enter "node daemon.js" on the command line. 

If running with the public testnet (this is easiest), set "const useStellarTestnet = true" in stellar-demo-lib/shared-config.js

If you want to run with the internal stellar network with the custom docker, refer to the README:
https://github.com/thejnaut1/ncnt/blob/master/ncnt-game/README-custom-docker

IMPORTANT: 
Make sure that node_modules are only installed in one place (should not have separate folders in dev-cent, ncnt-game, and stellar-demo-lib)

######################### FUNCTIONALITY #########################

daemon.js hosts several different web pages:

/
- human readable display of all the accounts, public/private keys, balances

/JSON
- JSON version of the home page

/new_wallet
QUERY PARAMETERS
REQUIRED "name": specifies the username associated with the wallet, must be unique
OPTIONAL "seed": if specified, the new wallet is also seeded with a configurable amount of DevCents
OUTPUT: JSON with "err" field if an error, otherwise "processing" (should be successful though not guaranteed)
EFFECT (if successful): creates a new account (possibly with DevCents)

/balance
QUERY PARAMETERS
REQUIRED "name": specifies whose balance to check 
OUTPUT: JSON with "err" message if invalid username or "balance" field with the requested balance

/fund
QUERY PARAMETERS
REQUIRED "name": specifies who to send DevCent to (from the distributor)
REQUIRED "amt": specifies amt of DevCent
OUTPUT: JSON with "err" message if some kind of error or "processing" 
IF "processing", most likely will succeed (unless amt is invalid)
EFFECT (if successful): sends "amt" DevCent from distributor to "name"

/send
QUERY PARAMETERS
REQUIRED "from": specifies who to send DevCent from
REQUIRED "to": specifies to whom to send DevCent 
OUTPUT: JSON with "err" message if some kind of error or "processing" 
IF "processing", does not mean that payment of ONE DevCents will be completed, it just means that cursory checks did not fail
EFFECT (if successful): sends one DevCent from "from" to "to" 

/redeem
QUERY PARAMETERS
REQUIRED "from": specifies who is redeeming DevCent
OUTPUT: JSON with "err" field if some error, otherwise "processing" (successful redemption not guaranteed)
IF "processing", can still fail due to insufficient balance of DevCent (i.e. trying to redeem with 0 DevCents)
EFFECT (if successful): sends one DevCent from "from" to the redemption account, reward of "nCntDollar01" is awarded recursively

/prev_owners
QUERY PARAMETERS
REQUIRED "name": specifies whose account to check
OPTIONAL "amount": specifies which coin to track the provenance of (default to the next unsent coin if unspecified)
OUTPUT: JSON with "err" message if some kind of error or "prev_owners" array of the previous owners (earlier indices represent people that held the DevCent earlier in time)

/rebuild_history
QUERY PARAMETERS
OPTIONAL "name": specifies whose account to rebuild transaction history for, if not specified, rebuilds transaction history for everyone\
OUTPUT: JSON with "err" message if some kind of error or "processing" if rebuilding transaction history
EFFECT (if successful): reloads the user send/receive history (this is used for recursive rewards) from the ledger


/dump_userkey_info
OUTPUT: Three arrays with usernames, public keys, and private keys, everything required to reboot daemon. Issuer/Distributor/Redeemer information is not outputted. 

######################### CONSOLE LOGGING #########################

All successful payments are logged in the console by daemon.js
They are not available in any other form or location, though this can change if wanted/necessary