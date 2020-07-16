const google = require('googleapis').google;
const _auth = require('./Authorizer');
const pubsub = google.pubsub('v1');
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (request, response) {
    ddb.scan({
        TableName: "ChineseAnimal"
    }).promise()
        .then(data => {
            // your code goes here
        })
        .catch(err => {
            // error handling goes here
        });
    pubsub.projects.topics.subscriptions.list({
        topic: `projects/${process.env.GCP_PROJECT}/topics/cloud-builds`,
        pageSize: 10
    })
        .then(response => {
            console.log(response.data);  // successful response
            /*
            response.data = {
                "subscriptions": [
                    "projects/<project>/subscriptions/<subscription-1>",
                    "projects/<project>/subscriptions/<subscription-2>",
                    ...
                ]
            }
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });

    response.send({ "message": "Successfully executed" });
}