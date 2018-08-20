const config = require('./config');
const SetupLib = require('../stellar-demo-lib/setup-lib');
const StellarSdk = require('stellar-sdk');

var issuerKeypair;
var distributorKeypair;
var redeemKeypair;

var ncentGameCoin;
var ncentDollar;

function createInitialKeypairs() {
    issuerKeypair = SetupLib.createKeypair();
    distributorKeypair = SetupLib.createKeypair();
    redeemKeypair = SetupLib.createKeypair();
}

// register all key pairs in parallel
async function registerInitialKeypairs() {
    var starttime = Date.now();
    var allkp = SetupLib.userKeypairs().slice(0);
    allkp.push(issuerKeypair);
    allkp.push(distributorKeypair);
    allkp.push(redeemKeypair);
    const totalCount = allkp.length;

    await SetupLib.registerAllKeypairs(allkp);

    console.log('all', totalCount, 'keypairs registered in', Date.now()-starttime, 'msec');
}

// all establish asset trust in parallel
// NOTE: if allkp arg is given, that data struct is destroyed!
async function allTrustDevCent(allkp) {
    await SetupLib.allTrustGameCoin(allkp, [ncentDollar, ncentGameCoin]);
}

///////////////////////// transfers /////////////////////////

async function transferFunds(fromKP, toPublicKeyArr, amountStrArr) {
    await SetupLib.transferFunds(fromKP, toPublicKeyArr, amountStrArr, ncentGameCoin);
}

async function transferRewards(fromKP, toPublicKeyArr, amountStrArr) {
    await SetupLib.transferFunds(fromKP, toPublicKeyArr, amountStrArr, ncentDollar);
}

///////////////////////// initial setup /////////////////////////


async function fundDistributor() {
    await transferFunds(issuerKeypair, [distributorKeypair.publicKey()], [config.initialBankFunding]);
}

async function fundRedeemWallet() {
    await transferRewards(issuerKeypair, [redeemKeypair.publicKey()], [config.initialRedeemFunding]);
}


async function setupAllAccounts() {
    createInitialKeypairs();
    await registerInitialKeypairs();

    // create the currency
    ncentGameCoin = await new StellarSdk.Asset(config.tokenName, issuerKeypair.publicKey());
    ncentDollar = await new StellarSdk.Asset(config.rewardName, issuerKeypair.publicKey());

    // in coin we trust
    await allTrustDevCent([distributorKeypair, redeemKeypair]);

    await fundDistributor();
    await fundRedeemWallet();

    await showAllBalances();
}

///////////////////////// output /////////////////////////

async function showAllBalances() {
    var starttime = Date.now();
    console.log('ISSUER:');
    await SetupLib.showBalances(issuerKeypair);

    console.log('\nDISTRIBUTOR:');
    await SetupLib.showBalances(distributorKeypair);

    console.log('\nREDEEM:');
    await SetupLib.showBalances(redeemKeypair);

    console.log('\nUSERS:');

    var users = SetupLib.users();
    var userKeypairs = SetupLib.userKeypairs();
    for (let i=0; i<users.length; ++i) {
    	console.log(users[i] + ':');
    	await SetupLib.showBalances(userKeypairs[i]);
    }

    console.log('all balances displayed in', Date.now()-starttime, 'msec');
}

///////////////////////// exports /////////////////////////

module.exports = {
    sendCreditTo: async function(pubKeyArr, amountStrArr) {
	await transferFunds(distributorKeypair, pubKeyArr, amountStrArr);
	for (let i=0; i<pubKeyArr.length; ++i) {
	    console.log("Sent " + pubKeyArr[i] + " reward of " + amountStrArr[i]);
	}
    },
    sendRewardTo: async function(pubKeyArr, amountStrArr) {
    await transferRewards(redeemKeypair, pubKeyArr, amountStrArr);
    for (let i=0; i<pubKeyArr.length; ++i) {
        console.log("Sent " + pubKeyArr[i] + " reward of " + amountStrArr[i]);
    }
    },
    transferFunds: transferFunds,
    transferRewards: transferRewards,
    setupAllAccounts: async function() { await setupAllAccounts(); },
    allTrustDevCent: allTrustDevCent,
    distributorKeypair: function() { return distributorKeypair; },
    issuerKeypair: function() { return issuerKeypair; },
    redeemKeypair: function() { return redeemKeypair; }
}
