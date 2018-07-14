# ncentSDK
## Coming Soon!

ncentSDK is a Javascript library for communicating with the nCent API. It is used for building nCent applications either on Node.js or in the browser, as well as for accessing base-level features on the API.

It provides:
- a networking layer for endpoints on the back-end API.
- eventual facilities for building and signing transactions, for communicating with the backend API, and for submitting transactions or querying network history.

In our initial version, we will provide support for:

 - transferTokens
 - createWallet
 - getAllBalances
 - getTokenBalances
 - getAllTransactionHistory
 - getTokenTransactionHistory
 - destroyTokens
 - redeemToken
 - stampToken
 - signMessage

## Quick start

Using npm to include the nCentSDK in your own project:
```shell
  npm i ncent-sdk
```

***Eventually build:***
For browsers, use Bower to install ncentSDK. It exports a
variable `nCentSDK`. The example below assumes you have `ncentSDK.js`
relative to your html file.

```html
<script src="SDK"></script>
<script>console.log(nCentSDK);</script>

```

## Install

### To use as a module in a Node.js project
1. Install it using npm:
  ```shell
  npm i ncent-sdk
  ```

2. require/import it in your JavaScript:
  ```js
  var nCentSDK = require('SDK');
  ```

In the event the above does not work, please contact us to get help resolving your issue.


### To develop and test the SDK:

1. Clone the repo:

  ```shell
  git clone https://github.com/thejnaut1/ncnt/ncentSDK.git
  ```

2. Install dependencies inside our ncentSDK folder:
  ```shell
  cd ncentSDK
  npm install
  ```

## Usage

TBD

## Testing
To be updated.

## Documentation
Documentation for this repo lives in our Github and eventually on our website [Developers site](https://www.ncnt.io).

## Contributing
For information on how to contribute, please email kk@ncnt.io, mb@ncnt.io, kd@ncnt.io, or jd@ncnt.io

## Publishing to npm


## License
SDK is licensed under ...

------------
