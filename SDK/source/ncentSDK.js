const axios = require('axios');
const nacl = require('tweetnacl');
const StellarSdk = require('stellar-sdk');

// Create class for ncentSDK and SDK functions for each action.

const testNet = 'http://localhost:8010/api';

class ncentSDK {
    constructor () {
        this._net = testNet;
    }

    /*
    * createWallet creates a wallet by hashing the timestamp. 
    * string walletAddress - a new walletAddress for the user.
    * string emailAddress - email.
    * string privateKey - a new privateKey for the user.
    */  

    createWalletAddress() {
        let KeyPair = StellarSdk.Keypair.random();
        return KeyPair;
    };
    
    /*
        destroyTokens destroys all tokens of a certain tokenType.
        string walletAddress: The user's wallet address.
        string privateKey: The user's private key.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */

    destroyTokens(sponsor_KeyPair, tokentype_id, resolve, reject) {
        const sponsor_private = sponsor_KeyPair._secretKey;
        var dec = function(s) {
            if (typeof atob === 'undefined') {
              return new Uint8Array(Array.prototype.slice.call(new Buffer(s, 'base64'), 0));
            } else {
              var i, d = atob(s), b = new Uint8Array(d.length);
              for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
              return b;
            }
        };
        const message_obj = {tokentype_id: tokentype_id};
        const message = JSON.stringify(message_obj);
        const msg = dec(message);
        const signed = nacl.sign.detached(msg, sponsor_private);
        axios.put(this._net+ '/tokentypes/' + tokentype_id, {
            signed: JSON.stringify(Array.from(signed))
        })
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            //console.log(error.message);
            return reject(error);
        });
    }
    /*
        stampTokens initiates a new token type and creates n of these tokens.
        string walletAddress: The user's wallet address.
        string tokenName: Name of token the user wants to create. 
        date ExpiryDate: Date of expiration for token. 
        int numTokens: number of tokens to create.
        success: callback;
        error: callback;
    */
    stampToken(public_key, tokenName, numTokens, ExpiryDate, success, reject) {
        // Make a request for a user with a given ID
        axios.post(this._net + '/tokentypes', {
            sponsor_uuid: public_key,
            Name: tokenName,
            totalTokens: numTokens,
            ExpiryDate: ExpiryDate,          
        })
        .then(function(response) {
            //console.log(response.data);
            return success(response);
        })
        .catch(function(error) {
            //console.log(error);
            return reject(error);
        })
    }
    
    /*
        transferTokens allows tokens to be transferred between two parties.
        string walletSender: The sender's wallet address.
        string signature: The sender's signature.
        int tokenType: UUID of token the user is transferring. 
        int tokenAmount: number of tokens to transfer.
        success: callback;
        error: callback;
    */

    transferTokens(sender_KeyPair, receiver_public, tokentype_id, tokenAmount, resolve, reject) {
        const sender_private = sender_KeyPair._secretKey;
        var dec = function(s) {
            if (typeof atob === 'undefined') {
              return new Uint8Array(Array.prototype.slice.call(new Buffer(s, 'base64'), 0));
            } else {
              var i, d = atob(s), b = new Uint8Array(d.length);
              for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
              return b;
            }
        };
        const message_obj = {fromAddress: sender_KeyPair.publicKey(), toAddress: receiver_public, amount: tokenAmount};
        const message = JSON.stringify(message_obj);
        const msg = dec(message);
        const signed = nacl.sign.detached(msg, sender_private);
        axios.post(this._net + '/tokentypes/' + tokentype_id + '/items', {
            amount: tokenAmount,
            fromAddress: sender_KeyPair.publicKey(),
            toAddress: receiver_public,
            signed: JSON.stringify(Array.from(signed))
        })
        .then(function(response) {
            //console.log(response.data)
            return resolve(response);
        })
        .catch(function(error) {
            //console.log(error);
            return reject(error);
        })
    }
    
    /*
        getTokenBalance gets the balance for any user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getTokenBalance(public_key, tokentype_uuid, resolve, reject) {
        axios.get(this._net + '/wallets/' + public_key + '/' + tokentype_uuid)
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            //console.log(error.message);
            return reject(error);
        });
    }
    
    /*
        getAllBalances returns the balance for all tokens in a user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getAllBalances(public_key, resolve, reject) {
        axios.get(this._net + '/wallets/' + public_key, {
        })
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            //console.log(error.message);
            return reject(error);
        });
    }
    
    /*
        getTokenTransactionHistory provides a history of outgoing and incoming 
        transactions from a user's wallet for one token.
        string walletAddress: user's wallet address.
        int tokenType: UUID for token.
        params: any additional parameters.
        success: callback.
        error: callback.
    */
    // getTokenTransactionHistory(walletAddress, tokenType, params, success, error) {
    //     axios.get(this._net + '/balance', {
    //         params: {
    //             walletAddress: walletAddress,
    //             tokenType: tokenType
    //         }
    //     })
    //     .then(function(response){
    //         console.log(response);
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    //     .then(function(){
    //     });       
    // }
    
    // /*
    //     getTransactionHistory provides a history of outgoing and incoming 
    //     transactions from a user's wallet for one token.
    //     string walletAddress: user's wallet address.
    //     params: any additional parameters.
    //     success: callback.
    //     error: callback.
    // */
    // getTransactionHistory(walletAddress, params, success, error) {
    //     axios.get(this._net + '/balance', {
    //         params: {
    //             walletAddress: walletAddress
    //         }
    //     })
    //     .then(function(response){
    //         console.log(response);
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    //     .then(function(){

    //     });   
    // }
    
    /*
        redeemToken redeems the token based off the specified redeem action 
        written in the original contract. 
        string walletAddress: creator's wallet address.
        string redeemerSignature: redeemer's signature.
        string sponsorSignature: sponsor signature.
        int tokenType: UUID for tokenType.
        int numRedeem: number of tokens to redeem.
        params: any additional parameters.
        success: callback.
        error: callback.
    */

    // redeemToken(walletAddress, redeemerSignature, sponsorSignature,
    //        tokenType, numRedeem, params, success, error) {
    //    axios.post(this._net + '/transaction')
    //         .then(function(response){
    //            console.log(response);
    //        })
    //        .catch(function(error){
    //            console.log(error);
    //        });   
    // }
       
}
module.exports = ncentSDK;
