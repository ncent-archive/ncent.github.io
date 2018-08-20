const jobCentSDK = require('./index.js');
const sdk = new jobCentSDK();

new Promise(function(resolve, reject) {
	return sdk.getUserKeypair('fakeemail2', resolve, reject)
})
.then(response =>{
	console.log(response);
})
.catch(error =>{
	console.log(error);
})