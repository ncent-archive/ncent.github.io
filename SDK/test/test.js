/*
    Runs certain tests to test ncentSDK.

*/
//var sdk = require('./ncentSDK.js');
const mySDK = require('../source/ncentSDK.js');

sdk = new mySDK();
// import ncentSDK from ncentSDK.js;

function defaultResolve(response) {
    console.log(response.data);
}
function defaultReject(error) {
    console.log(error);
}

const keypair1 = sdk.createWalletAddress();
const keypair2 = sdk.createWalletAddress();
const keypair3 = sdk.createWalletAddress();
//keypair1._secretSeed = keypair3._secretSeed;
//keypair1._secretKey = keypair3._secretKey;
console.log(keypair1);
console.log(keypair2);
let token_id;

new Promise(function(resolve, reject) {
    return sdk.stampToken(keypair1.publicKey(), 'jobCent', 1000000, '2021', resolve, reject);
})
.then(function(response) {
    token_id = response.data["token"]["uuid"];	
})
.then(function() {
    //return sdk.transferTokens(keypair1, keypair2.publicKey(), token_id, 10, defaultResolve, defaultReject);
    return sdk.destroyTokens(token_id, defaultResolve, defaultReject);
})
.catch(function(error) {
    console.log(error);
})