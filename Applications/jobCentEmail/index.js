///////////////Things to npm install\\\\\\\\\\\\\
const express = require('express');
const fetch = require("isomorphic-fetch");
const fs = require("fs");
const opn = require('opn');
const PubSub = require(`@google-cloud/pubsub`); //must use gcloud init / install, read google cloud SDK for more info

const pubsub = new PubSub({
	keyFilename: './JobCent-850fe0fe5e43.json'
});
const subscriptionName = 'projects/jobcent-210021/subscriptions/emailWatcher';
const subscription = pubsub.subscription(subscriptionName);

// const jobCentHostUrl = "http://52.53.165.193:3000/";
const gmailPort = 3001;
const app = express();

const scopes = [
                    'https://mail.google.com/',
                    'https://www.googleapis.com/auth/gmail.modify',
                    'https://www.googleapis.com/auth/gmail.readonly',
                    'https://www.googleapis.com/auth/gmail.send'
                ];
const {google} = require('googleapis');
const gmailClass = google.gmail('v1');
const oauth2Client = new google.auth.OAuth2(
  '885935339824-qgg9t6caoi4v824kvrtktcte4taf6qi1.apps.googleusercontent.com',
  'aViJjmhHPZfy85l0vDnvwl5n',
  `http://52.53.165.193:3001/`
);
// const oauthUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes});

const gmailApiSync = require('gmail-api-sync');
gmailApiSync.setClientSecretsFile('./client_secret.json');

const ncentSDK = require('../../SDK/source/');
const ncentSdkInstance = new ncentSDK();
const walletsCreated = {
	"jobcent@ncnt.io": true,
	"mb@ncnt.io": true,
	"jd@ncnt.io": true,
	"af@ncnt.io": true,
	"jp@ncnt.io": true,
	"an@ncnt.io": true,
	"kd@ncnt.io": true,
	"ag@ncnt.io": true
};

const alreadyProcessed = {};
let gmail;
let startHistoryId;
let currHistoryId;
let token_id;
let tkn = 'ya29.GlsJBkl-GiAKSBzdgMiB-DFvkTysuJIanaq_LoKrCjB7bcbZdCEO2-cAG83GnhgYVIW5VDPd2-z9Tvcxk5H56V3yl48ica--_uqmMMVsGJVqMNTxpjiIW2asLPWB';

////////////////////////////FUNCTIONS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function initJobCent() {
	return new Promise(function(resolve, reject) {
		return ncentSdkInstance.stampToken('jobcent@ncnt.io', 'jobCent', 10000, '2021', resolve);
	})
	.then(function(response) {
		token_id = response.data["tokenTypeResponseData"]["uuid"];		
	})
	.then(function() {
		return createAndTransfer('mb@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('af@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('jd@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('kd@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('jp@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('an@ncnt.io');
	})
	.then(function() {
		return createAndTransfer('ag@ncnt.io')
	})
	.catch(function(error){
		console.log(error);
		return;
	});
}
function createAndTransfer(email) {
	return new Promise(function(resolve, reject) {
		ncentSdkInstance.createWalletAddress(email, token_id, resolve);
	})
	.then(function(createWalletResponse) {
		//console.log(createWalletResponse.data);
		return new Promise(function(resolve, reject) {
			ncentSdkInstance.transferTokens('jobcent@ncnt.io', email, token_id, 20, resolve, reject);
		})
	})
	.catch(function(error) {
		console.log(error);
		return;
	})
}

function createWalletIfNeeded(walletExists, toEmail, resolve){
	if(!walletExists){
	  	ncentSdkInstance.createWalletAddress(toEmail, token_id, resolve);
	  	walletsCreated[toEmail.toString()] = true;
	} else {
		resolve("nothing done");
	}
	return;
}

function getEmailString(headerVal){
	let startIdx = headerVal.value.indexOf('<');
	let endIdx = headerVal.value.indexOf('>');
	let emailString = headerVal.value.indexOf('<') === -1 ? headerVal.value : headerVal.value.substring(startIdx+1, endIdx);
	return emailString;
}

function defaultResolve(response) {
	return response;
}

function defaultError(error) {
	return error;
}

function processTransaction(to, from) {
	new Promise(function(resolve, reject) {
		createWalletIfNeeded(walletsCreated[to.toString()], to, resolve);
	})
	.then(function(response) {
		new Promise(function(resolve, reject) {
			ncentSdkInstance.transferTokens(from, to, token_id, 1, resolve, reject);
		})
		.then(function() {
			console.log("jobCent sent to " + to + " from " + from);
			sendEmail(to, './receivedjobCent.html', "Congrats, you've received a jobCent!");
			return;
		})
		.catch(function(error){
			console.log(error.message);
			if (error.response.status === 403) sendEmail(from, './nojobCent.html', "Error: You do not have any jobcents to send");
			return;
		});	
	})
	.catch(function(error){
		console.log(error.message);
		return;
	});
}

function printMessage(message){
	console.log(`Received message ${message.id}:`);
  	console.log(`\tData: ${message.data}`);
  	console.log(`\tAttributes: ${message.attributes}`);
}

// function listHistory(address, startHistoryId, callback) {
// 	const getPageOfHistory = function(resp, result) {
// 		//console.log(resp);
// 		result = result.concat(resp.data.historyId);
// 		let nextPageToken = resp.nextPageToken;
// 		const options = {
// 			'userId': address, 
// 			'auth': oauth2Client, 
// 			'startHistoryId': startHistoryId, 
// 			'historyTypes': "messageAdded",
// 			'pageToken': nextPageToken
// 		};
// 		if (nextPageToken) {
// 		  gmail.users.history.list(options)
// 		  .then(function(response) {
// 			getPageOfHistory(response, result);
// 		  })
// 		  .catch(function(error) {
// 			console.log(error);
// 			return;
// 		  })
// 		} else {
// 		  callback(result);
// 		}
// 	};
// 	gmail.users.history.list({
// 	  'auth': oauth2Client,
// 	  'startHistoryId': startHistoryId,
// 	  'historyTypes': "messageAdded",
// 	  'userId': address
// 	})
// 	.then(function(response){
// 		getPageOfHistory(response, []);
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 		return;
// 	})
//   }

// function listMessages(userId, callback) {
// 	let getPageOfMessages = function(resp, result) {
// 		result = result.concat(resp.data.messages);
// 		let nextPageToken = resp.data.nextPageToken;
// 		//console.log(nextPageToken);
// 		if (nextPageToken) {
// 		  gmail.users.messages.list({
// 			'userId': userId,
// 			'pageToken': nextPageToken,
// 			'auth': oauth2Client
// 		  })
// 		  .then(function(response) {
// 			getPageOfMessages(response, result);
// 		  })
// 		  .catch(function(error) {
// 			console.log(error);
// 		  })
// 		} else {
// 		  callback(result);
// 		}
// 	};
// 	gmail.users.messages.list({
// 	  'userId': userId,
// 	  'auth': oauth2Client
// 	})
// 	.then(function(response) {
// 		//console.log(response);
// 		getPageOfMessages(response, []);
// 	})
// 	.catch(function(error) {
// 		console.log(error.message);
// 	})
//   }

function dealNewMessage(msgOptions, message) {
	let toEmail = '';
	let fromEmail = '';
	new Promise (function(resolve, reject) {
		gmail.users.messages.get(msgOptions)
		.then(function(response){
			console.log("getresponse: " + response.data.id);
			let ccFound = false;
			let multiTo = false;
			let headers = response.data.payload.headers;
			for(idx in headers) {
				if (headers[idx].name === 'To') {
				if ((headers[idx].value.match(/@/g) || []).length !== 1) multiTo = true;
					toEmail = getEmailString(headers[idx]);
				}
				if (headers[idx].name === "From") fromEmail = getEmailString(headers[idx]);
				if (headers[idx].name === "Cc") {
					let startIdx = headers[idx].value.indexOf('jobcent@ncnt.io');
					if (startIdx !== -1) ccFound = true;
				}
				if (toEmail !== '' && fromEmail !== '' && ccFound) break;
			}
			if(!ccFound) return;
			if(multiTo) {
				sendEmail(fromEmail, './manyAddresses.html', "Error: You've entered too many addresses in the To line");
				return;
			}
			console.log('\nSending one jobCent from ' + fromEmail + ' to ' + toEmail);
			processTransaction(toEmail, fromEmail);
		})
		.catch(function(error){
			console.log(error);
			return;
		})
	})
	.then(function() {
		console.log("message acknowledged");
		message.ack();
	})
	.catch(function(error){
		console.log(error.message);
		return;
	});
}

function messageHandler(message) {
  	let messageJSON = JSON.parse(message.data);
  	//console.log("in message handler");
  	if(messageJSON.emailAddress !== 'jobcent@ncnt.io') {
  		message.ack();
  		return;
	 }
	if ((message.id in alreadyProcessed)) return;
	printMessage(message);
	currHistoryId = messageJSON.historyId;
  	if (startHistoryId === undefined || currHistoryId < startHistoryId) {
		message.ack();
  		return;
	}
	console.log("startHistoryId: " + startHistoryId + ", currHistoryId: " + currHistoryId);
	const syncOptions = {historyId: startHistoryId};
  	new Promise(function(resolve, reject) {
		return syncMessages(false, syncOptions, resolve, reject);
  	})
  	.then(function(response){
		if (response.emails.length !== 0) {
			for (i = 0; i < response.emails.length; i++) {
				const msgOptions = {'userId': messageJSON.emailAddress, 'auth': oauth2Client, 'id': response.emails[i].id};
				alreadyProcessed[response.emails[i].id] = 1;
				dealNewMessage(msgOptions, message);
			}
		} else {
			console.log("array is empty again");
		}
	})
	.catch(function(error) {
		console.log(error);
		return;
	})
	startHistoryId = currHistoryId;
};

const sendEmail = async (receiver, file, subject) => {
	fs.readFile(file, (err,data) => {
	  let email_lines = [];

	  email_lines.push('From: "nCnt Hiring" <jobcent@ncnt.io>');
	  email_lines.push('To: ' + receiver);
	  email_lines.push('Content-type: text/html;charset=utf-8');
	  email_lines.push('MIME-Version: 1.0');
	  email_lines.push('Subject: ' + subject);
	  email_lines.push('');

	  email_lines.push(data);

	  let email = email_lines.join('\r\n').trim();

	  let base64EncodedEmail = new Buffer(email).toString('base64');
	  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

	  gmailClass.users.messages.send({
	    	auth: oauth2Client,
	    	userId: 'me',
	    	resource: {
	      		raw: base64EncodedEmail
	    	}
	  });

	});
}

function initEmailWatcher() {
	let options = {
	    userId: 'me',
	    auth: oauth2Client,
	    resource: {
	        labelIds: ['INBOX'],
	        topicName: "projects/jobcent-210021/topics/emailTransaction"
	    }
	};

	gmail.users.watch(options, function (err, res) {
	    if (err) {
	        //console.log(err);
	        return;
		}
	});
}

function getOauthTokens (tokenCode) {
	//console.log("get auth tokens");
	return oauth2Client.getToken(tokenCode);
}

function setOauthCredentials () {
	//console.log("set auth credentials");
	//tkn = tokens.tokens;
	oauth2Client.credentials = tkn;
}

function syncMessages(full, syncOptions, resolve, reject) {
	gmailApiSync.authorizeWithToken(tkn, function (err, oauth) {
		if (err) {
			return reject(err);
		}
		else {
			if (full) {
				gmailApiSync.queryMessages(oauth, syncOptions, function (err, response) {
					if (err) {	
						return reject(err);
					}
					return resolve(response);
					//console.log(response);
				});
			} else {
				gmailApiSync.syncMessages(oauth, syncOptions, function (err, response) {
					if (err) {
						return reject(err);
					}
					//console.log(response.emails);
					return resolve(response);
				})
			}
		}
	});
}

function getHomePageCallback (request, response) {
	const fullSyncOptions = {query: 'from: ncnt.io'};
    // getOauthTokens(request.query.code)
    //     .then(function(tokens) {
            setOauthCredentials(tokens);
			gmail = google.gmail({version: 'v1', oauth2Client});
			initEmailWatcher();
			new Promise(function(resolve, reject) {
				syncMessages(true, fullSyncOptions, resolve, reject);
			})
			.then(function(response) {
				console.log(response);
				startHistoryId = response.historyId;
				console.log(startHistoryId);
				subscription.on(`message`, messageHandler);
			})
			.catch(function (error) {
				console.log(error);
			})
			response.send("Done with authentication.");
		// }, function(reason){
		// 	console.log("get auth tokens failed" + reason)
		// });
	}

function main() {
	initJobCent();
	console.log(oauthUrl);
	// opn(oauthUrl);
   	app.get('/', getHomePageCallback);
	app.listen(gmailPort, (err) => {
      		if (err) {
      			console.log(`failed to listen to ${gmailPort}`, err);
      		}
    	});
}
////////////////////////CODE\\\\\\\\\\\\\\\\\\\\\\\\\\\\
main();
