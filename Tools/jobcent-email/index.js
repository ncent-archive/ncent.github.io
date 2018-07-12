const express = require('express');
const app = express();
const fetch = require("isomorphic-fetch");
const fs = require("fs");
const opn = require('opn');

const jobCentHostUrl = "http://localhost:3000/";
const PubSub = require(`@google-cloud/pubsub`);
const pubsub = new PubSub({
	keyFilename: './DevCent-998971fc504f.zßjson'
});
const subscriptionName = 'projects/devcent-1526321229076/subscriptions/newSubTest';
const subscription = pubsub.subscription(subscriptionName);
const gmailPort = 3001;

const scopes = [
                    'https://mail.google.com/',
                    'https://www.googleapis.com/auth/gmail.modify',
                    'https://www.googleapis.com/auth/gmail.readonly',
                    'https://www.googleapis.com/auth/gmail.send'
                ];

const {google} = require('googleapis');
const gmailClass = google.gmail('v1');
const oauth2Client = new google.auth.OAuth2(
  '614964866683-8pp4bakhcct0fv73hdhe8pefk0d217ol.apps.googleusercontent.com',
  '9nxp7EOkm79tp6XN38JrnsgU',
  `http://localhost:${gmailPort}/`
);
const oauthUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes});

const ncentSDK = require('../ncentSDK/source/ncentSDK.js');
const ncentSdkInstance = new ncentSDK();
// const masterWalletAddress = ncentSdkInstance.createWallet('an@ncnt.io');
const walletsCreated = {
    "an@ncnt.io": true
};

const alreadyProcessed = {};
let gmail;
let startHistoryId;
let currHistoryId;

const processTransaction = async (to, from) => {

	let from_addr = ncentSdkInstance.getWalletAddress(from, "", "success", "error");
	let to_addr = ncentSdkInstance.getWalletAddress(to, "", "success", "error");

	if (ncentSdkInstance.getTokenBalance(from_addr, jobCent, "", "sucess", "error") === 0) {
		sendEmail(from, './nojobCent.html', "Error: You do not have any jobcents to send");
		return;
	}

	ncentSdkInstance.transferTokens(from_addr, to_addr, "ana", jobCent, 1, "", "success", "error");
	sendEmail(to, './receivedjobCent.html', "Congrats, you've received a jobCent!");
}

const messageHandler = async message => {
  let messageJSON = JSON.parse(message.data);
  if(messageJSON.emailAddress !== 'an@ncnt.io') {
  	message.ack();
  	return;
  }
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);


  startHistoryId = currHistoryId;
  currHistoryId = messageJSON.historyId;
  const options = {userId: messageJSON.emailAddress, auth: oauth2Client, startHistoryId: startHistoryId, historyTypes:"messageAdded"};

  if (startHistoryId === undefined) {
  	message.ack();
  	return; //The first time we get a message we don't get notified. The first message kind of sets things up
  }
  // console.log(options);

  // Result is basically the messages that we got notified for
  let result = await gmail.users.history.list(options);
	  result.data.history.forEach(entry => {
	  	// console.log(entry.messages); //Prints the new messages info
	  	entry.messages.forEach(async (message) => {
	  		if ((message.id in alreadyProcessed)) {
	  			return;
	  		}
	  		alreadyProcessed[message.id] = 1;
	  		const msgOptions = {userId: messageJSON.emailAddress, auth: oauth2Client, id: message.id};
	  		let messageInfo = await gmail.users.messages.get(msgOptions);
	  		let headers = messageInfo.data.payload.headers;
	  		// console.log(messageInfo.data.payload.headers);
	  		let toEmail = '';
	  		let fromEmail = '';
        let ccFound = false;
	  		let multiTo = false;
	  		for(idx in headers) {
	  			// console.log(headers);
	  			if (headers[idx].name === 'To') {
	  				console.log(headers[idx].value);
            if ((headers[idx].value.match(/@/g) || []).length !== 1) multiTo = true;
	  				let startIdx = headers[idx].value.indexOf('<');
	  				let endIdx = headers[idx].value.indexOf('>');
	  				toEmail = headers[idx].value.indexOf('<') === -1 ? headers[idx].value : headers[idx].value.substring(startIdx+1, endIdx);
	  			}
	  			if (headers[idx].name === "From") {
	  				let startIdx = headers[idx].value.indexOf('<');
	  				let endIdx = headers[idx].value.indexOf('>');
	  				fromEmail = headers[idx].value.indexOf('<') === -1 ? headers[idx].value : headers[idx].value.substring(startIdx+1, endIdx);
	  			}
          if (headers[idx].name === "Cc") {
	  				let startIdx = headers[idx].value.indexOf('an@ncnt.io');
	  				if (startIdx !== -1) ccFound = true;
	  			}
	  			if (toEmail !== '' && fromEmail !== '' && ccFound) break;
	  		}
        if(!ccFound) {
          return;
        }
	  		if(multiTo) {
	  			sendEmail(fromEmail, './manyAddresses.html', "Error: You've entered too many addresses in the To line");
	  			return;
	  		}
	  		if(!wallets_Created(toEmail.toString())){
	  			ncentSdkInstance.createWallet(toEmail);
	  			wallets_Created.add(toEmail.toString());
	  		}
	  		processTransaction(toEmail, fromEmail);
	  		console.log(toEmail);
	  		console.log(fromEmail);

	  	});
	  });
  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

///////////////////////////////// Purely email stuff \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const sendEmail = async (receiver, file, subject) => {
	fs.readFile(file, (err,data) => {
	  let email_lines = [];

	  email_lines.push('From: "nCnt Hiring" <an@ncnt.io>');
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
	let options = {
	    userId: 'me',
	    auth: oauth2Client,
	    resource: {
	        labelIds: ['INBOX'],
	        topicName: 'projects/devcent-1526321229076/topics/devcent'
	    }
	};

	gmail.users.watch(options, function (err, res) {
	    if (err) {
	        console.log(err);
	        return;
	    }
	});
}

function getOauthTokens (tokenCode) {
    return new Promise(function (resolve, reject) {
        console.log("getAuthTokensPromise");
        return oauth2Client.getToken(tokenCode);
    });
}

function setOauthCredentials (tokens) {
    return new Promise(function (resolve, reject) {
        console.log("setCredentialsPromise");
        return oauth2Client.setCredentials(tokens);
    });
}

function getHomePageCallback (request, response) {
    console.log("getHomePageCallback");
    console.log("request.query.code");
    getOauthTokens(request.query.code)
        .then(function(tokens) {
            console.log("gotTokens");
            setOauthCredentials(tokens)
                .then(function() {
                    gmail = google.gmail({version: 'v1', oauth2Client});
                    initEmailWatcher();
                    subscription.on(`message`, messageHandler);
                    response.send("Forget about me");
                });
        }, function() {
            console.log("getAuthTokensFailed");
        });
}

function main() {
    console.log("main");
    opn(oauthUrl);

    app.listen(gmailPort, (err) => {
      if (err) {
        return console.log(`failed to listen to ${gmailPort}`, err);
      }

      console.log(`Server is listening on ${gmailPort}`);
    });

    app.get('/', getHomePageCallback);
}

main();
