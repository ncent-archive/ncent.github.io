## Link to Stellar KeyPair documentation:
https://stellar.github.io/js-stellar-sdk/Keypair.html

``` javascript
// to create a keypair:
let keyPair = nCentSDK.createWalletAddress();
// or
let keyPair = StellarSdk.Keypair.random();

// Use these keys when passing into our functions
// to get public key
keyPair.publicKey()
// to get secret key
keyPair.secret()

// Don’t use the buffer econdings as parameters to the nCent SDK
// to get public key buffer encoding
keyPair._publicKey
// to get secret key buffer encoding
keyPair._secretKey
```
