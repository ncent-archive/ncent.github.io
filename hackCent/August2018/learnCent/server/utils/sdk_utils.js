const ncentSDK = require('../../../../../SDK/source/ncentSDK');
const sdk = new ncentSDK();
const StellarSdk = require('stellar-sdk');

const createUserKeypair = () => {
  const wallet = sdk.createWalletAddress();
  const publicKey = wallet.publicKey();
  const privateKey = StellarSdk.StrKey.encodeEd25519SecretSeed(wallet._secretSeed);
  return ({publicKey, privateKey});
};

const stampUniversityToken = () => {
  // Taken from test.js example in SDK docs
  // new Promise(function(resolve, reject) {
  //     return sdk.stampToken(keypair1.publicKey(), 'jobCent', 1000000, '2021', resolve, reject);
  // })
  // .then(function(response) {
  //     console.log(response.data);
  //     token_id = response.data["token"]["uuid"];
  // })
  // .then(function() {
  //     return sdk.transferTokens(keypair1, keypair2.publicKey(), token_id, 10, defaultResolve, defaultReject);
  // })
  // .catch(function(error) {
  //     console.log(error);
  // })
};

const createWalletFromPrivateString = (privateKeyString) => {
  const wallet = StellarSdk.KeyPair.fromSecret(privateKeyString);
  return wallet;
};

const transferTokens = (fromUser, toUser, amount) => {
  const tokenTypeId = null; // TODO Stamped university token
  const fromWallet = createWalletFromPrivateString(fromUser.private_key);
  const toPublicKey = toUser.public_key;
  sdk.transferTokens(
    fromWallet,
    toPublicKey,
    tokenTypeId,
    amount,
    (response)=>console.log(response.data),
    (error)=>console.log(error.data));
};

const getTokenBalance = (fromUser) => {
  const tokenTypeId = null; // TODO Stamped university token
  const publicKey = fromUser.publicKey;
  sdk.getTokenBalance(
    publicKey,
    tokenTypeId,
    (response)=>console.log(response.data),
    (error)=>console.log(error.data));
};

module.exports = { createUserKeypair, transferTokens, getTokenBalance };
