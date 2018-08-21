### Sandbox API calls using SDK

#### Reference material
 - These API calls will need to use the SDK located at [/SDK/source/ncentSDK.js](../../../../SDK/source/ncentSDK.js)
 - Usage: [/SDK/](../../../../SDK/)
 - You must be running the [Sandbox](../../../../Sandbox/Sandbox%20API/) for the SDK to interact with

## Functionality
 - [x] createKeypair()
  - invokes SDK createWalletAddress
  - returns keypair for user creation
  - will be invoked prior to user validation
 - [x] transferTokens(fromUser, toUser, amount)
  - `const StellarSdk = require('stellar-sdk');`
  - const fromPrivateKey = (get private key of fromUser)
  - const fromPublicKey = (get public key of fromUser)
  - const toPublicKey = (get public key of toUser)
  - const fromKeyPair = (construct new [stellar Keypair](https://stellar.github.io/js-stellar-sdk/Keypair.html))
    - {publicKey: fromPublicKey, privateKey: fromPrivateKey}
  - const tokenId = (get user's token id from university association)
  - invoke SDK's `transferTokens` with:
    - (fromKeyPair, toPublicKey, tokenId, amount, resolve, reject)
 - [ ] getTokenBalance(userId)
  - get user publicKey from database
  - get user tokenId from university association
  - Invoke SDK's getTokenBalance; Return user's balance;

### Broader Semantics
  - We will have a University model. This university will initially stamp a token. Users will have a belongsTo association with this university which will allow them to get the tokenId for the university for transferring, etc.
  - We should decide on an implementation for the storage of the sessionToken. I believe it'd be best to take a minimalist approach with:
    - Only sessionToken is stored in session
    - currentUser will be identified by matching this session's sessionToken to the user with the matching token
    - Ability to get currentUser from any place in backend
