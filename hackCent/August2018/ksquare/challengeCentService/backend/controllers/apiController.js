const ncentSDK = require('../../SDK/source/ncentSDK');

// jshint esversion : 6
index = (req, res) => {


    sdk = new ncentSDK('http://localhost:8010/api');



    // Define default callback functions
    function defaultResolve(response) {
        console.log(response.data);
    }
    function defaultReject(error) {
        console.log(error.data);
    }

// generate keypairs
    const keypair1 = sdk.createWalletAddress('imamkhalid1712@gmail.com');
    const keypair2 = sdk.createWalletAddress('imamkhalid1712@gmail.com');


    let token_id;

// For your first async SDK call, wrap it in a promise.
// Then, you can chain other async calls
//
// In this example, we initialize some tokens with stampToken,
// retrieve the token_id, and transfer tokens between wallets.
    new Promise(function(resolve, reject) {
        return sdk.stampToken(keypair1.publicKey(), 'jobCent', 1000000, '2021', resolve, reject);
    })
        .then(function(response) {
            console.log(response.data);
            token_id = response.data["token"]["uuid"];
        })
        .then(function() {
            return sdk.transferTokens(keypair1, keypair2.publicKey(), token_id, 10, defaultResolve, defaultReject);
        })
        .catch(function(error) {
            console.log(error);
        })


  res.json({
    message: keypair1,
    documentation_url: "Your Service is ready",
    endpoints: [
      {method: "GET", path: "/api", description: keypair2}
    ]
  });

}

module.exports.index = index;




// base_url: "http://tunely.herokuapp.com",
