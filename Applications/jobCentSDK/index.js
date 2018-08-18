const axios = require('axios');

const testNet = 'http://localhost:8020/jobCent';

class jobCentSDK {
    constructor () {
        this._net = testNet;
    }
    storeWalletAddress(emailAddress, keypair, resolve, reject) {
        axios.post(this._net + '/users', {
            id: emailAddress,
            public_key: keypair.publicKey(),
            private_key: keypair.secret()
        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });

    };

    getUserKeypair(emailAddress, resolve, reject) {
        axios.get(this._net + '/users/' + emailAddress, {

        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });
    };

}
module.exports = jobCentSDK;

