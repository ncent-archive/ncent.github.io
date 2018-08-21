const ncentSDK = require('../../../../../SDK/source/ncentSDK');
const sdk = new ncentSDK();
const StellarSdk = require('stellar-sdk');

const createKeypair = () => {
  const wallet = sdk.createWalletAddress();
  const publicKey = wallet.publicKey();
  const privateKey = StellarSdk.StrKey.encodeEd25519SecretSeed(wallet._secretSeed);
  return ({publicKey, privateKey});
};

const stampUniversityToken = (universityName, universityPublicKey) => {
  const TOKEN_AMOUNT = 100000;
  const EXPIRATION_DATE = '2021';
  const TOKEN_NAME = `${universityName}Cent`;

  new Promise(function(resolve, reject) {
      return sdk.stampToken(
        universityPublicKey,
        TOKEN_NAME,
        TOKEN_AMOUNT,
        EXPIRATION_DATE,
        (res)=>console.log(res),
        (rej)=>console.log(rej));
  })
  .then(function(response) {
      const tokenId = response.data["token"]["uuid"];
  })
  .catch(function(error) {
      console.log(error);
  });
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

module.exports = {
  createKeypair,
  transferTokens,
  getTokenBalance,
  stampUniversityToken };
