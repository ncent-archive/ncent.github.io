
// setup to run in a nodejs environment, use the NodeJS setup instructions found at https://github.com/stellar/js-stellar-sdk

const configLib = require('../stellar-demo-lib/shared-config');
const config = require('./config');
console.log('useRecursiveReward =', config.useRecursiveReward);
console.log();

const SetupLib = require('../stellar-demo-lib/setup-lib');
const SetupGame = require('./setup-devcent');
const RewardLib = require('../stellar-demo-lib/reward-lib');
const StellarSdk = require('stellar-sdk');

const express = require('express');
const app = express();

var StellarServer = new StellarSdk.Server(SetupLib.serverURL);

var totalTransfers = 0;
var newUsers = {};
var fundUsers = [];
var fundUserAmt = [];
var paymentQueue = {};
var outstandingPayments = [];

async function credit_players_rec(trans){
	//console.log("User send history: ", JSON.stringify(userSendHistory, null, 4));
	//console.log("User receive history: ", JSON.stringify(userReceiveHistory, null, 4));

	var starttime = Date.now();
	var rewards = [];
	rewards[trans["from"]] = trans["amt"]*config.rewardAmt;

	RewardLib.add_reward(trans, rewards, 0.5*config.rewardAmt, config.tokenName,
		[SetupGame.issuerKeypair().publicKey(), SetupGame.distributorKeypair().publicKey()]);

	var pubKeyArr = [];
	var amountStrArr = [];

	var distributorPubKey = SetupGame.distributorKeypair().publicKey();
	for (var pubKey in rewards){
		if (pubKey !== distributorPubKey){
			pubKeyArr.push(pubKey);
			amountStrArr.push(rewards[pubKey].toFixed(7));
		}
	}

	console.log('Crediting players recursively');
	if (pubKeyArr.length > 0) {
		console.log(pubKeyArr);
		console.log(amountStrArr);

	    await SetupGame.sendRewardTo(pubKeyArr, amountStrArr);
	}
	console.log('(round)		@', Date.now(), '	-- after', Date.now()-starttime,'msec');
}

function handle_payment_rec(op){
	if (op["type"] === "payment" && op["asset_code"] === config.tokenName){
		var sender = op["from"];
  		var recipient = op["to"];
  		var amtFloat = parseFloat(op["amount"]);

  		RewardLib.handle_payment_rec(op, config.tokenName);

  		if (recipient === SetupGame.redeemKeypair().publicKey()) {
  			credit_players_rec({"amt": amtFloat, "from": sender, "t": op["created_at"]});
  		}
	}
}

async function handle_new_users(){
	newUsersOld = newUsers;
	newUsers = {};

	var fundUsersOld = fundUsers.splice(0);
	var fundUserAmtOld = fundUserAmt.splice(0);

	var nUsers = Object.keys(newUsersOld);

	if (nUsers.length == 0){
		if (fundUsers.length > 0){
			await SetupGame.sendCreditTo(fundUsersOld, fundUserAmtOld);
		}
		return;
	}

	var newkp = nUsers.map(x => newUsersOld[x]);

	await SetupLib.registerAllKeypairs(newkp.slice(0));
	await SetupGame.allTrustDevCent(newkp.slice(0));
	SetupLib.addUsers(nUsers, newkp);
	await SetupGame.sendCreditTo(fundUsersOld, fundUserAmtOld);
}

async function handle_payments(){
	outstandingPayments = [];
	var paymentQueueOld = paymentQueue;
	paymentQueue = {};

	var usersFrom = Object.keys(paymentQueueOld);
	if (usersFrom.length == 0)	return;

	var usersFromFlatten = [];
	var usersTo = [];

	usersFrom.forEach(function (e){
		for (let i = 0; i < paymentQueueOld[e].length; i++){
			usersFromFlatten.push(e);
			usersTo.push(paymentQueueOld[e][i]);
		}
	});

	var usersFromKPs = usersFromFlatten.map(x => fetchKP(x));
	var usersToKPs = usersTo.map(x => fetchKP(x));
	var usersToBalance = await SetupLib.getAllBalances(usersToKPs, config.tokenName);

	var paymentPromises = [];

	var index = 0;
	for (let i = 0; i < usersFrom.length; i++){
		var paymentToArr = [];
		var amountStrArr = [];
		for (let j = 0; j < paymentQueueOld[usersFrom[i]].length; j++){
			if (Number(usersToBalance[index] == Number(0))){
				paymentToArr.push(usersToKPs[index].publicKey());
				amountStrArr.push('1');
			}
			else {
				console.log('Payment from', usersFromFlatten[i], 'to', usersTo[i], 'failed due to non-zero token balance');
			}

			index += 1;
		}

		paymentPromises.push(SetupGame.transferFunds(usersFromKPs[index - 1], paymentToArr, amountStrArr));
	}

	await Promise.all(paymentPromises);
	console.log('All payments processed');
}

var payments = StellarServer.payments();
payments.cursor("now");

payments.stream({
	onmessage: function(payment) {
		setTimeout(function(){
			handle_payment_rec(payment);
		});
	}
});

SetupGame.setupAllAccounts().then(function() {
	setInterval(handle_new_users, config.intervalBetweenRegistrations * 1000);
	setInterval(handle_payments, config.intervalBetweenPayments * 1000);

});

async function fetch_all_balance(res){
	var users = SetupLib.users();
	var allkp = SetupLib.userKeypairs().slice(0);

	var distributorKeypair = SetupGame.distributorKeypair();
	distributorKeypair["name"] = "Distributor";

	var redeemKeypair = SetupGame.redeemKeypair();
	redeemKeypair["name"] = "Redeem";

    for (var i in users){
    	allkp[i]["name"] = users[i];
    }

    allkp.push(distributorKeypair);
    allkp.push(redeemKeypair);

    await Promise.all(allkp.map(async (kp) => {
	   await StellarServer.loadAccount(kp.publicKey())
			.then(function(account){
				var accountInfo = "Account Info for: " + kp["name"]
								+ "\nPublic Key: " + kp.publicKey()
								+ "\nSecret Key: " + kp.secret() + "\n";

				account.balances.forEach(function(balance) {
				var code = 'NCNT';
				if (balance.asset_type == 'credit_alphanum12')
				    code = balance.asset_code;
					accountInfo += 'Type: ' + balance.asset_type
					    + ', Code: ' + code
					    + ', Balance:' + balance.balance + '\n';
			    });

				res.write(accountInfo + '\n');
			})
			.catch(function(error) {
			    console.error('Error! (@fb)', "Requested account(s) not found. You may need to wait for accounts to be setup before searching");
			});
    }));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	fetch_all_balance(res).then(function() {
		res.end();
	});
});

async function fetch_all_balance_JSON(resList){
	var users = SetupLib.users();
	var allkp = SetupLib.userKeypairs().slice(0);

	var distributorKeypair = SetupGame.distributorKeypair();
	distributorKeypair["name"] = "Distributor";

	var redeemKeypair = SetupGame.redeemKeypair();
	redeemKeypair["name"] = "Redeem";

    for (var i in users){
    	allkp[i]["name"] = users[i];
    }

    allkp.push(distributorKeypair);

    await Promise.all(allkp.map(async (kp) => {
	   await StellarServer.loadAccount(kp.publicKey())
			.then(function(account){
				var accountInfo = {name: kp["name"], publicKey: kp.publicKey(), secretKey: kp.secret(), balances: []};

				account.balances.forEach(function(balance) {
				var code = 'NCNT';
				if (balance.asset_type == 'credit_alphanum12')
				    code = balance.asset_code;
						accountInfo.balances.push({type: balance.asset_type, code: code, balance: balance.balance});
					// accountInfo += 'Type: ' + balance.asset_type
					//     + ', Code: ' + code
					//     + ', Balance:' + balance.balance + '\n';
			    });

				resList.push(accountInfo);
			})
			.catch(function(error) {
			    console.error('Error! (@fb)', "Requested account(s) not found. You may need to wait for accounts to be setup before searching");
			});
    }));
}

app.get('/JSON', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	var resList = [];
	fetch_all_balance_JSON(resList).then(function() {
		res.send(JSON.stringify(resList));
		// res.write(resList);
		// res.end();
	});
});


app.get('/table', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	SetupLib.showLeaderTable(res, config.tokenName).then(function() {
	    res.end();
	});
});


function fetchKP(username){
	var users = SetupLib.users();	
	var index = users.indexOf(username);
	if (index == -1)	return null;
	return SetupLib.userKeypairs()[index];
}

app.get('/new_wallet', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var name = req.query.name;
	var seed = req.query.seed;
	if (name == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "name"'}));
	}
	else {
		if ((fetchKP(name) != null) || (name in newUsers)){
			res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "name"'}));
		}
		else {
			res.send(JSON.stringify({'processing': 'Trying to create new user ' + name + '\n'}));
			newUsers[name] = SetupLib.createKeypair();
			if (seed != null){
				fundUsers.push(newUsers[name].publicKey());
				fundUserAmt.push(config.initSeedStr);
			}
		}
	}
});

app.get('/redeem', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var from = req.query.from;
	if (from == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "from"'}));
	}
	else {
		var fromKP = fetchKP(from);
		var toKP = SetupGame.redeemKeypair();
	
		if (fromKP == null){
			res.send(JSON.stringify({'err': 'Username not found.'}));
		}
		else {
			res.send(JSON.stringify({'processing': 'Trying to redeem token from ' + from + '\n'}));
			SetupGame.transferFunds(fromKP, [toKP.publicKey()], ["1"]);
		}
	}
});

app.get('/balance', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var name = req.query.name;
	var keypair = fetchKP(name);

	if (name == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "name"'}));
	}
	else if (keypair == null) {			
		res.send(JSON.stringify({'err': 'Username not found.'}));
	}
	else {
		try {
		SetupLib.getBalance(keypair, config.tokenName).then(function (b){
			res.send(JSON.stringify({'balance': b}));
		});
		}
		catch(err) {
			res.send(JSON.stringify({'err': 'Unable to fetch balance for this user.'}));
		}

	}
});

app.get('/fund', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var name = req.query.name;
	var keypair = fetchKP(name);

	var amt = req.query.amt;
	if (name == null || amt == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "name" and "amt"'}));
	}
	else if (keypair == null){
		res.send(JSON.stringify({'err': 'Invalid username specified.'}));
	}
	else {
		fundUsers.push(keypair.publicKey());
		fundUserAmt.push(amt);
		res.send(JSON.stringify({'processing': 'Trying to fund ' + name + ' with ' + amt + '\n'}));
	}
});

app.get('/send', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var from = req.query.from;
	var to = req.query.to;
	if (from == null || to == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "from" and "to"'}));
	}
	else {
		var fromKP = fetchKP(from);
		var toKP = fetchKP(to);

		if (fromKP == null || toKP == null){		
			res.send(JSON.stringify({'err': 'Usernames not found.'}));
		}
		else {
			if (!(from in paymentQueue)){
				paymentQueue[from] = [];
			}

			if (outstandingPayments.indexOf(to) != -1){
				res.send(JSON.stringify({'err': 'A referral for this user is already queued.'}));
			}
			else {	
				outstandingPayments.push(to);
				paymentQueue[from].push(to);
				res.send(JSON.stringify({'processing': 'Queueing payment from ' + from + ' to ' + to}));
			}
		}
	}
});

app.get('/dump_userkey_info', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write(JSON.stringify(SetupLib.users()));
	res.write(JSON.stringify(SetupLib.userKeypairs().map(x => x.publicKey())));
	res.write(JSON.stringify(SetupLib.userKeypairs().map(x => x.secret())));
	res.end();
});

app.get('/prev_owners', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var name = req.query.name;
	var amt = req.query.amt;
	var keypair = fetchKP(name);

	if (name == null){
		res.send(JSON.stringify({'err': 'Not enough parameters specified. Need to specify "name"'}));
	}
	else if (keypair == null) {			
		res.send(JSON.stringify({'err': 'Username not found.'}));
	}
	else {
		var pkeys = RewardLib.find_provenance(keypair.publicKey(), config.tokenName, [
			SetupGame.distributorKeypair().publicKey(), SetupGame.issuerKeypair().publicKey()
			], amt);
		var prev_users = [];
		var users = SetupLib.users();	
		var userKeypairs = SetupLib.userKeypairs();
		for (let i = 0; i < pkeys.length; i++){
			for (let j = 0; j < userKeypairs.length; j++){
				if (userKeypairs[j].publicKey() == pkeys[i]){
					prev_users.push(users[j]);
					break;
				}
			}
		}

		res.send(JSON.stringify({'prev_owners': prev_users}));
	}
});

app.get('/rebuild_history', (req, res) => {	
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	var name = req.query.name;
	var keypair = fetchKP(name);

	if (name == null){
		//If no name specified, rebuild all users
		var userKeypairs = SetupLib.userKeypairs();
		try {
			var rebuildPromises = userKeypairs.map(x => RewardLib.rebuild_token_history(x.publicKey(), config.tokenName));
			res.send(JSON.stringify({'processing': 'Rebuilding token history...'}));
		}
		catch(err) {
			res.send(JSON.stringify({'err': 'Failed to rebuild transaction history for all users.'}));
		}
	}
	else if (keypair == null) {			
		res.send(JSON.stringify({'err': 'Username not found.'}));
	}
	else {
		try {
			RewardLib.rebuild_token_history(keypair.publicKey(), config.tokenName);
			res.send(JSON.stringify({'processing': 'Rebuilding token history...'}));
		}
		catch(err) {
			res.send(JSON.stringify({'err': 'Failed to rebuild transaction history for this user.'}));
		}

	}
});

app.listen(configLib.port, (err) => {
	if (err) {
    	return console.log('something bad happened', err);
 	}

	console.log(`server is listening on ${configLib.port}`);
});
