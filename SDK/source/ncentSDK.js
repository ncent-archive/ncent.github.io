const axios = require('axios');

// Create class for ncentSDK and SDK functions for each action.

const testNet = 'http://54.153.103.132:8010/api';

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

    //if tokentype_id is null, default is the ncnt uuid
    createWalletAddress(emailAddress, tokentype_id, resolve) {
       //let privateKey = ((+new Date) + Math.random()* 2).toString(32);
       //console.log(privateKey);
        if (tokentype_id == null) {
            axios.post(this._net + '/wallets', {
                wallet_uuid: emailAddress
            })
            .then(function(response) {
                //console.log(response.data);
                return resolve(response);
            })
            .catch(function(error) {
                console.log(error.response);
                return error;
            });
        } else {
            axios.post(this._net + '/wallets', {
                tokentype_uuid: tokentype_id,
                wallet_uuid: emailAddress
            })
            .then(function(response) {
                //console.log(response.data);
                return resolve(response);
            })
            .catch(function(error) {
                console.log(error);
                return error;
            });
        }

    };
    
    /*
        inIt creates the ncnt tokenType and the walletAccounts for 
        all NCNT employees and initializes all balances. 
        int tokenType: UUID associated with NCNT.
        Array<string> emailAddress: array of email addresses 
    */
    initNCNT(resolve) {
        let name = "NCNT"
        let numTokens = 1000;
        let date = "2018-12-12"
        const ncnt_uuid = this.stampToken("company@ncnt.io", name, numTokens, date, resolve);
        return ncnt_uuid;
    }   
//     init(emails) {
//         console.log("hi");
//         // pseudocode - writing up shortly.
//         this.initNCNT();
//         let emailAddress = emails;
//         let arrayLength = emailAddress.length;
//         for (let i = 0; i < arrayLength; i++) {
//             this.createWallet(emailAddress[i]);            
//             axios.post(this.net, {
//                 email: emailAddress[i],
//                 tokenID: tokenID,
//                 numTokens: numTokens,
//                 date: date,          
//             }
//             ).then(function(response) {
//                 console.log(response.data);
//             }
//             ).catch(function(error) {
//                 console.log(error.response);
//             });
//         return tokenID; 
//         // return tokenTypeID, and balanceID.
//         //tokentypeID, balanceID;          
//         }
// }

    /*
        destroyTokens destroys all tokens of a certain tokenType.
        string walletAddress: The user's wallet address.
        string privateKey: The user's private key.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    //change time to server side

    destroyTokens(tokentype_id, resolve) {
    // checker here.
        //if (typeof walletAddress == 'object' && typeof privateKey == 'object')
        var currentDate = new Date();
        axios.put(this._net+ '/tokentypes/' + tokentype_id, {
            ExpiryDate: currentDate.getTime(),
        })
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            console.log(error.response);
            return error;
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
    stampToken(walletAddress, tokenName, numTokens, ExpiryDate, success) {
        // Make a request for a user with a given ID
        let resp;
        let uuid;
        axios.post(this._net + '/tokentypes', {
            sponsor_uuid: walletAddress,
            Name: tokenName,
            totalTokens: numTokens,
            ExpiryDate: ExpiryDate,          
        })
        .then(function(response) {
            //console.log(response.data);
            uuid = response.data.uuid;
            resp = response;
            resp.data = {
                tokenTypeResponseData: response.data
            };
        })
        .catch(function(error) {
            console.log(error);
            return error;
        })
        .then(function() {
            axios.post(this._net + '/wallets', {
                tokentype_uuid: uuid,
                wallet_uuid: walletAddress,
                balance: numTokens
            })
            .then(function(response) {
                resp.data["walletResponseData"] = response.data;
                console.log(resp);
                return success(resp);
            })
            .catch(function(error) {
                console.log(error);
                return error;
            });
        }.bind(this));
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

    transferTokens(walletSender_id, walletReceiver_id, tokentype_id, tokenAmount, resolve, reject) {
        const sdk = this;
        let resp;
        axios.all([
            axios.get(sdk._net + '/wallets/' + walletSender_id + '/' + tokentype_id),
            axios.get(sdk._net + '/wallets/' + walletReceiver_id + '/' + tokentype_id)
        ])
        .then(axios.spread(function(sender, receiver) {
            axios.all([
                axios.post(sdk._net + '/tokentypes/' + tokentype_id + '/items', {
                    amount: tokenAmount,
                    fromAddress: walletSender_id,
                    toAddress: walletReceiver_id,
                }),
                axios.put(sdk._net + '/wallets/' + walletSender_id + '/' + tokentype_id, {
                    balance: sender.data[0].balance - tokenAmount
                }),
                axios.put(sdk._net + '/wallets/' + walletReceiver_id + '/' + tokentype_id, {
                    balance: receiver.data[0].balance + tokenAmount
                })
            ])
            .then(axios.spread(function(txn, sdrbal, rvrbal) {
                resp = txn;
                resp.data = {
                    tr: txn.data,
                    sdr: sdrbal.data,
                    rvr: rvrbal.data
                };
                //console.log(txn.data);
                //console.log(sdrbal.data);
                //console.log(rvrbal.data);
                return resolve(resp);
            }))
            .catch(function(error) {
<<<<<<< HEAD
                console.log(error.response);
                return error;
=======
                console.log(error);
                return reject(error);
>>>>>>> 4fa2d91b14b83ddf8000a3010f09726a4974ca9b
            })
        }))
    }
    
    /*
        getTokenBalance gets the balance for any user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getTokenBalance(wallet_uuid, tokentype_uuid, resolve) {
        axios.get(this._net + '/wallets/' + wallet_uuid + '/' + tokentype_uuid)
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            console.log(error.response);
            return error;
        });
    }
    
    /*
        getAllBalances returns the balance for all tokens in a user's wallet. 
        string walletAddress: The user's wallet address.
        int tokenType: The uuid associated the the token you want to destroy. 
        success: callback;
        error: callback;
    */
    getAllBalances(wallet_uuid, resolve) {
        axios.get(this._net + '/wallets/' + wallet_uuid, {
        })
        .then(function(response) {
            //console.log(response.data);
            return resolve(response);
        })
        .catch(function(error) {
            console.log(error.response);
            return error;
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
//that.initNCNT();
//that.destroyTokens('5963c694-59f2-4cd5-9fc0-d28175094fd4');

//that.createWalletAddress("kyle@ncnt.io", '2d388c45-2b02-484c-b673-9809bcaaa309');
//that.createWalletAddress("jd@ncnt.io", 'c5809dad-bed1-4432-a131-edb886beee42');

//that.getTokenBalance('jd@ncnt.io', '5963c694-59f2-4cd5-9fc0-d28175094fd4');
//that.getAllBalances('jd@ncnt.io');
//that.transferTokens("kyle@ncnt.io", "jd@ncnt.io", 'c5809dad-bed1-4432-a131-edb886beee42', 50);
//that.init(['a', 'b', 'c', 'd']);  
