const ncentSDK = require('../../../../../SDK/source/ncentSDK');
const sdk = new ncentSDK();
const StellarSdk = require('stellar-sdk');

const createKeypair = () => {
  const wallet = sdk.createWalletAddress();
  const publicKey = wallet.publicKey();
  const privateKey = StellarSdk.StrKey.encodeEd25519SecretSeed(wallet._secretSeed);
  return ({publicKey, privateKey});
};

const stampUniversityToken = (university) => {
  const TOKEN_AMOUNT = 100000;
  const EXPIRATION_DATE = '2021';
  const TOKEN_NAME = `${university.dataValues.name}Cent`;
  return (
    new Promise(function(resolve, reject) {
        return sdk.stampToken(
          university.dataValues.public_key,
          TOKEN_NAME,
          TOKEN_AMOUNT,
          EXPIRATION_DATE,
          resolve,
          reject
        );
    })
    .then(function(response) {
        console.log("Created a universityToken:", response.data);
        const tokenId = response.data["uuid"];
        university.token_id = tokenId;
    })
    .catch(function(error) {
        console.log(error);
    })
  );
};

const createWalletFromPrivateString = (privateKeyString) => {
  const wallet = StellarSdk.KeyPair.fromSecret(privateKeyString);
  return wallet;
};

const transferTokens = (fromUser, toUser, amount) => {
  const tokenTypeId = 1; // fromUser.getUniversity().token_id; (getUniversity may be a promise, check docs)
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
  const tokenTypeId = fromUser.getUniversity().token_id;
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
  stampUniversityToken
};
