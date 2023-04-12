const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const topicArn = "arn:aws:sns:us-east-1:458991758553:AutoHubSns";

exports.handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'MODIFY' || record.eventName === 'INSERT' ) {
      const message = `New car has been listed on the portal`;
      const params = {
      TopicArn: topicArn,
      Message: message,
      };
    await sns.publish(params).promise();
    }
  }
}
