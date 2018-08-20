require('es6-promise').polyfill();

// // stellar-sdk classes to expose
// export * from "./errors";
// export {Config} from "./config";
// export {Server} from "./server";
// export {FederationServer, FEDERATION_RESPONSE_MAX_SIZE} from "./federation_server";
// export {StellarTomlResolver, STELLAR_TOML_MAX_SIZE} from "./stellar_toml_resolver";

// expose classes and functions from ncentSDK
const ncentSDK = require("./ncentSDK.js");
module.exports = ncentSDK;

//export default module.exports;
