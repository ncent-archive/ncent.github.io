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

const jobCentHostUrl = "http://localhost:3000/";
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
  `http://localhost:3001/`
);
const oauthUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes});

const ncentSDK = require('../../SDK/source/ncentSDK.js');
const ncentSdkInstance = new ncentSDK();
const walletsCreated = {
    "jobcent@ncnt.io": true
};


const alreadyProcessed = {};
let gmail;
let startHistoryId;
let currHistoryId;
let token_id;

////////////////////////////FUNCTIONS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const initJobCent = async() => {
	// let pms = new Promise(function(resolve, reject) {
	// 	ncentSdkInstance.stampToken('jobcent@ncnt.io', 'jobCent', 10000, '2021');
	// })
	// .then(function(response) {
	// 	token_id = response.data["tokenTypeResponseData"]["uuid"];
	// 	new Promise(function(resolve, reject) {
	// 		ncentSdkInstance.createWalletAddress('mb@ncnt.io', token_id);
	// 	})
	// 	.then(function()
	// })
	// .catch(function(error) {
	// 	console.log(error);
	// 	return;
	// });
	// let response = await pms;
	
	// console.log(token_id);

	// let y = await x;
	// return;
	return new Promise(function(resolve, reject) {
		return ncentSdkInstance.stampToken('jobcent@ncnt.io', 'jobCent', 10000, '2021', resolve);
	})
	.then(function(response) {
		console.log(response);
		token_id = response.data["tokenTypeResponseData"]["uuid"];	
		console.log(token_id);	
	})
	.then(function() {
		ncentSdkInstance.createWalletAddress('mb@ncnt.io', token_id, resolve);
		// ncentSdkInstance.createWalletAddress('kk@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('af@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('jd@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('kd@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('an@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('jp@ncnt.io', token_id);
		// ncentSdkInstance.createWalletAddress('ag@ncnt.io', token_id);
	})
	.then(function() {
		ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'mb@ncnt.io', token_id, 500, resolve);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'kk@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'af@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'jd@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'kd@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'an@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'jp@ncnt.io', token_id, 500);
		// ncentSdkInstance.transferTokens('jobcent@ncnt.io', 'ag@ncnt.io', token_id, 500);
	})
	.catch(function(error){
		console.log(error);
		return;
	});
}

function createWalletIfNeeded(walletExists, toEmail){
	if(!walletExists){
	  	ncentSdkInstance.createWalletAddress(toEmail, token_id);
	  	wallets_Created[toEmail.toString()] = true;
	 }
}

function getEmailString(headerVal){
	let startIdx = headerVal.value.indexOf('<');
	let endIdx = headerVal.value.indexOf('>');
	let emailString = headerVal.value.indexOf('<') === -1 ? headerVal.value : headerVal.value.substring(startIdx+1, endIdx);
	return emailString;
}

const processTransaction = async (to, from) => {
	new Promise(function(resolve, reject) {
		createWalletIfNeeded(wallets_Created[to], to);
	})
	.then(function(response) {
		//console.log(response);
	})
	.catch(function(error) {
		console.log(error);
		return;
	});
	new Promise(function(resolve, reject) {
		ncentSdkInstance.getTokenBalance(from, token_id);
	})
	.then(function(response) {
		let balance = response.data.balance;
		if ( balance === 0) {
			sendEmail(from, './nojobCent.html', "Error: You do not have any jobcents to send");
			return;
		}
		ncentSdkInstance.transferTokens(from, to, token_id, 1);
		sendEmail(to, './receivedjobCent.html', "Congrats, you've received a jobCent!");
	})
	.catch(function(error) {
		console.log(error);
		return;
	})	
}

function printMessage(message){
	console.log(`Received message ${message.id}:`);
  	console.log(`\tData: ${message.data}`);
  	console.log(`\tAttributes: ${message.attributes}`);
}

const messageHandler = async message => {
  	let messageJSON = JSON.parse(message.data);
  	
  	if(messageJSON.emailAddress !== 'jobcent@ncnt.io') {
  		message.ack();
  		return;
 	 }
 	
 	printMessage(message);
  	startHistoryId = currHistoryId;
  	currHistoryId = messageJSON.historyId;
  	//console.log("before options");
  	const options = {	userId: messageJSON.emailAddress, 
  						auth: oauth2Client, 
  						startHistoryId: startHistoryId, 
  						historyTypes:"messageAdded"
  					};
  	//console.log("after options");
  	if (startHistoryId === undefined) {
  		//console.log("going to die");
  		message.ack();
  		return; //The first time we get a message we don't get notified. The first message kind of sets things up
  	}
  //	console.log("before history");
  	// Result is basically the messages that we got notified for
  	new Promise(function(resolve, reject) {
  		//console.log("in promise");
  		gmail.users.history.list(options);
  		//console.log("outside");
  	})
  	.then(function(response){
  		//console.log("response " + response);
  		response.data.history.forEach(entry => { 			// console.log(entry.messages); //Prints the new messages info
	  		entry.messages.forEach(async (message) => {
	  			if ((message.id in alreadyProcessed)) return;
	  			alreadyProcessed[message.id] = 1;

	  			const msgOptions = {userId: messageJSON.emailAddress, auth: oauth2Client, id: message.id};
	  			new Promise(function(resolve, reject) {
  					gmail.users.messages.get(msgOptions);
  				})
  				.then(function(response){
  					let toEmail = '';
	  				let fromEmail = '';
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
  				});
	  		});
		});
  		// "Ack" (acknowledge receipt of) the message
  		message.ack();
  		//console.log("history " + history);
  	})
  	.catch(function(error){
  		//console.log("in error");
  		console.log(error);
  		return;
  	});
};

const sendEmail = async (receiver, file, subject) => {
	fs.readFile(file, (err,data) => {
	  let email_lines = [];

	  email_lines.push('From: "nCnt Hiring" <jobcent@ncnt.io>');
	  email_lines.push('To: ' + receiver);
	  email_lines.push('Content-type: text/html;charset=iso-8859-1');
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
	//console.log("in email watch init");
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

function setOauthCredentials (tokens) {
	//console.log("set auth credentials");
	oauth2Client.credentials = tokens.tokens;
}

function getHomePageCallback (request, response) {
//	console.log("get home page call back");
    getOauthTokens(request.query.code)
        .then(function(tokens) {
            setOauthCredentials(tokens);
			gmail = google.gmail({version: 'v1', oauth2Client});
			//console.log("before init");
			initEmailWatcher();
			//console.log("here");
			subscription.on(`message`, messageHandler);
			response.send("Done with authentication.");
		}, function(reason){
		//	console.log("get auth tokens failed" + reason)
		});
	}

function main() {
	initJobCent();
	//console.log("in main");
    opn(oauthUrl);
   // console.log("opened auth url");

    app.listen(gmailPort, (err) => {
      if (err) {
      	console.log(`failed to listen to ${gmailPort}`, err);
      }

    });
   // console.log("after listen");

    app.get('/', getHomePageCallback);
}
////////////////////////CODE\\\\\\\\\\\\\\\\\\\\\\\\\\\\
main();
