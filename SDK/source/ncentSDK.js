const axios = require('axios');

// Create class for ncentSDK and SDK functions for each action.

const testNet = 'http://localhost:8010/api';

class ncentSDK {
    constructor () {
        this._net = testNet;
    }
    // var emailAddress;
    // var emailAddress = ["", "", ""];
    
    /*
    * createWallet creates a wallet by hashing the timestamp. 
    * string walletAddress - a new walletAddress for the user.
    * string emailAddress - email.
    * string privateKey - a new privateKey for the user.
    */   
    createWallet(emailAddress) {
       //let privateKey = ((+new Date) + Math.random()* 2).toString(32);
       //console.log(privateKey);
        axios.post(this._net + '/wallets', {
            uuid: emailAddress
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.response.data);
        });
    };
    
    /*
        inIt creates the ncnt tokenType and the walletAccounts for 
        all NCNT employees and initializes all balances. 
        int tokenType: UUID associated with NCNT.
        Array<string> emailAddress: array of email addresses 
    */
    init() {
        // init(emails) {
        //     // pseudocode - writing up shortly.
        //     //stampToken() // stamp the token.
        //     for loop (array emails) {
        //         createWallet();
        //         axios.post(
    
        //         ).then(
    
        //         ).catch(
    
        //         )};
        //     return tokentype_id, balanceID;          
        //     }
    }
    
    /*
        destroyTokens destroys all tokens of a certain tokenType.
        string walletAddress: The user's wallet address.
        string privateKey: The user's private key.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */

    //change time to server side

    destroyTokens(tokentype_id) {
    // checker here.
        //if (typeof walletAddress == 'object' && typeof privateKey == 'object')
        var currentDate = new Date();
        axios.put(this._net+ '/tokentypes/' + tokentype_id, {
            ExpiryDate: currentDate.getTime(),
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.response.data);
        });
    }
    /*
        stampTokens initiates a new token type and creates n of these tokens.
        string walletAddress: The user's wallet address.
        string signature: The user's signature.
        string tokenName: Name of token the user wants to create. 
        date expirationDate: Date of expiration for token. 
        int numTokens: number of tokens to create.
        success: callback;
        error: callback;
    */
    stampToken(walletAddress, tokenName, numTokens, ExpiryDate) {
        // Make a request for a user with a given ID
        axios.post(this._net + '/tokentypes', {
            sponsor_uuid: walletAddress,
            Name: tokenName,
            totalTokens: numTokens,
            ExpiryDate: ExpiryDate,          
        })
        .then(function(response) {
            console.log(response.data);
            return response.data.uuid;
        })
        .catch(function(error) {
            console.log(error.response.data);
        });
    }
    
    /*
        getWalletAddress gets passed in an email from the client and returns
        the wallet address associated with the email.
        string emailAddress: The user's email address.
        string walletAddress: The user's walletAddress.
        success: callback;
        error: callback;
    */
    // getWalletAddress(emailAddress, params, success, error) {
    //     // checker here.
    //     axios.get(this._net +'/tokentypes', {
    //         params: {
    //             emailAddress: emailAddress,
    //         }
    //     })
    //     .then(function(response){
    //         console.log(error);
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    //     .then(function(){
    //     });     
    // }
    createBalance(wallet_id, tokentype_id) {
        axios.post(this._net + '/wallets/' + wallet_id + '/items', {
            tokentype_uuid: tokentype_id,
        })
        .then(function(response) {
            console.log(response.data);
            return response.data.uuid;
        })
        .catch(function(error) {
            console.log(error.response.data);
            return -1;
        });
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

    transferTokens(senderBalance_id, receiverBalance_id, walletSender_id, walletReceiver_id, tokentype_id, tokenAmount) {
        const sendertokenAmount = this.getTokenBalance(walletSender_id, senderBalance_id)
        const receivertokenAmount = this.getTokenBalance(walletReceiver_id, receiverBalance_id);
        axios.all([
            axios.post(this._net + '/tokentypes/' + tokentype_id + '/items', {
                amount: tokenAmount,
                fromAddress: walletSender_id,
                toAddress: walletReceiver_id,
            }),
            axios.put(this._net + '/wallets/' + walletSender_id + '/' + senderBalance_id, {
                amount: sendertokenAmount - tokenAmount
            }),
            axios.put(this._net + '/wallets/' + walletReceiver_id + '/' + receiverBalance_id, {
                amount: receivertokenAmount + tokenAmount
            })
        ])
        .then(axios.spread(function(txn, sdrbal, rvrbal) {
            console.log(txn.data);
            console.log(sdrbal.data);
            console.log(rvrbal.data);
        }))
        .catch(function(error) {
            console.log(error.response.data);
        });
    }
    
    /*
        getTokenBalance gets the balance for any user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getTokenBalance(walletAddress, balance_id) {
        axios.get(this._net + '/wallets/' + walletAddress + '/' + balance_id)
        .then(function(response) {
            //console.log(response.data);
            return response.data.amount;
        })
        .catch(function(error) {
            console.log(error.response.data);
            return -1;
        });
    }
    
    /*
        getAllBalances returns the balance for all tokens in a user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getAllBalances(walletAddress) {
        axios.get(this._net + '/wallets/' + walletAddress + '/items', {
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.response.data);
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
    
    // /*
    //     signMessage adds signature to a message object. 
    //     success: callback.
    //     error: callback.
    // */   
    // signMessage (params, success, error) {
    //     axios.post(this._net + '/transaction')
    //         .then(function(response){
    //             console.log(response);
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         });
    // }        
}
module.exports = ncentSDK;
var that = new ncentSDK();
//that.inIt("kd@gmail.com", 090, 'success', 'error');
//that.destroyTokens('hi@hi.com', 'password', 001, success, error);
//var tokentype_id = that.stampToken('an@ncnt.io', "jobCent", 100, '2018-09-09');
//that.createWallet("kyle@ncnt.io");
//that.createWallet("jd@ncnt.io");   
//that.destroyTokens(tokentype_id);

//var balance_id = that.createBalance('jd@ncnt.io', '6a9c2bb7-5c33-4013-982c-b6d2691d8c3a');
//var balance_id_2 = that.createBalance('kyle@ncnt.io', '6a9c2bb7-5c33-4013-982c-b6d2691d8c3a');
//that.getTokenBalance('jd@ncnt.io', 'dcd96451-575f-48c4-a114-dba00e7350a9');
//that.getAllBalances('jd@ncnt.io');
that.transferTokens('bb0334f7-c7e7-4c17-8802-40559e05da31', 'e15c12c9-6e90-40c6-9ebd-92591d75ff5b', "jd@ncnt.io", "kyle@ncnt.io", '6a9c2bb7-5c33-4013-982c-b6d2691d8c3a', 100);
    
