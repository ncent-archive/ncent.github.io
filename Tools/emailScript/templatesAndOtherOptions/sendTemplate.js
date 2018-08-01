var params = {
    Destination: { /* required */
    BccAddresses: [
        'af@ncnt.io',
        /* more items */
        ],
    CcAddresses: [
        'jd@ncnt.io',
        /* more items */
        ],
    ToAddresses: [
        'kd@ncnt.io',
        /* more items */
        ]
    },
    Source: 'kk@ncnt.io', /* required */
    Template: 'signature.html',   // not sure if that is right. /* required */
    TemplateData: 'STRING_VALUE', /* required */
    ConfigurationSetName: 'STRING_VALUE',
    ReplyToAddresses: [
        'kk@ncnt.io',
        'kd@ncnt.io'
      /* more items */
    ],
    ReturnPath: 'kd@ncnt.io',
    //ReturnPathArn: 'STRING_VALUE',
    //SourceArn: 'STRING_VALUE',
    // Tags: [
    // {
    //     Name: 'STRING_VALUE', /* required */
    //     Value: 'STRING_VALUE' /* required */
    // },
      /* more items */
    //],
    //TemplateArn: 'STRING_VALUE'
};
ses.sendTemplatedEmail(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});