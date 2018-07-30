'use strict';

var aws = require('aws-sdk');

// Provide the full path to your config.json file.
aws.config.loadFromPath('./config.json');

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
const sender = "Sender Name <sender@recipient.com>";

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
const recipient = "recipient@example.com";
// try to make this a little clearer.
// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the
// ConfigurationSetName : configuration_set argument below.
const configuration_set = "ConfigSet";

// The subject line for the email.
const subject = "Amazon SES Test (AWS SDK for JavaScript in Node.js)";

// The email body for recipients with non-HTML email clients.
const body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
                + "This email was sent with Amazon SES using the "
                + "AWS SDK for JavaScript in Node.js.";

// The HTML body of the email.
const body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;

// The character encoding for the email.
const charset = "UTF-8";

// Create a new SES object.
var ses = new aws.SES();

// Specify the parameters to pass to the API.
var params = {
  Source: sender,
  Destination: {
    ToAddresses: [
      recipient
    ],
  },
  Message: {
    Subject: {
      Data: subject,
      Charset: charset
    },
    Body: {
      Text: {
        Data: body_text,
        Charset: charset
      },
      Html: {
        Data: body_html,
        Charset: charset
      }
    }
  },
  ConfigurationSetName: configuration_set
};

//Try to send the email.
ses.sendEmail(params, function(err, data) {
  // If something goes wrong, print an error message.
  if(err) {
    console.log(err.message);
  } else {
    console.log("Email sent! Message ID: ", data.MessageId);
  }
});
