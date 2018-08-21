
const mySDK = require('../../../../SDK/source/ncentSDK.js');

sdk = new mySDK();



function defaultResolve(response) {
    console.log(response.data);
}
function defaultReject(error) {
    console.log(error);
}

const keypair1 = sdk.createWalletAddress();
const keypair2 = sdk.createWalletAddress();
const keypair3 = sdk.createWalletAddress();

//console.log(keypair1);
//console.log(keypair2);
//console.log(keypair3);

let token_id;

new Promise(function(resolve, reject) {
    return sdk.stampToken(keypair1.publicKey(), 'nomnomcent', 1, '2021', resolve, reject);
})
.then(function(response) {
    //token_id = response.data["token"]["uuid"];
    token_id = response.data["uuid"];
    console.log("........ " + token_id);

})
.then(function() {
    return sdk.transferTokens(keypair1, keypair2.publicKey(), token_id, 1, defaultResolve, defaultReject);
    //return sdk.destroyTokens(token_id, defaultResolve, defaultReject);
})
.catch(function(error) {
    console.log(error);
})