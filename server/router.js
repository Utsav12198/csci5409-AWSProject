const express = require("express");
const util = require("util");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();
const AWS = require("aws-sdk");
const short = require("shortid");
const router = express.Router();
const upload = multer({});
const s3 = new AWS.S3();
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const getSecret = async () => {
  const secretName = process.env.secret_key_name;
  const client = new SecretsManagerClient({ region: "us-east-1" });
  let response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: "AWSCURRENT",
    })
  );
  let secret = response.SecretString;
  secret = await JSON.parse(secret);
  return secret;
};

//adding car details to dynamo and image to s3
router.post("/addcar", upload.single("image"), async (req, res) => {
  let secrets = await getSecret();

  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  const key = req.file.originalname;
  const imageBuffer = req.file.buffer;
  const uri = `http://${secrets.cloudfront_url}/${key}`;

  s3.putObject(
    {
      Bucket: secrets.bucket_name,
      Key: key,
      Body: imageBuffer,
      ACL: "public-read",
      ContentType: req.file.mimetype,
    },

    function (err, data) {
      if (err) {
        console.log("Error uploading image: ", err);
      } else {
        console.log("Image uploaded successfully!");
      }
    }
  );

  const params = {
    TableName: secrets.car_table_name,
    Item: {
      id: { S: short() },
      category: { S: req.body.category },
      description: { S: req.body.description },
      price: { S: req.body.price },
      model: { S: req.body.model },
      owner_email: { S: req.body.owneremail },
      owner_name: { S: req.body.ownername },
      img_url: { S: uri },
    },
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.error("Insertion Error ", err);
    } else {
      console.log("Insertion Successful ", data);
    }
  });

  res.status(200).send({
    message: "Successfully submitted the form",
  });
});

//login feature
router.post("/login", async (req, res) => {
  console.log("debug");
  let secrets = await getSecret();

  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

  const params = {
    TableName: secrets.user_table_name,
    KeyConditionExpression: "username = :uname",
    FilterExpression: "password = :pwd",
    ExpressionAttributeValues: {
      ":uname": { S: req.body.username },
      ":pwd": { S: req.body.pwd },
    },
  };

  dynamodb.query(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data.Items.length > 0) {
        data.Items.forEach(function (item) {
          if (
            item.username.S === req.body.username &&
            item.password.S === req.body.pwd
          ) {
            res.send({
              message: "Success",
            });
          } else {
            return res.send({
              message: "Failed",
            });
          }
        });
      } else {
        console.log("FAIL");
        return res.send({
          message: "Failed",
        });
      }
    }
  });
});

//user registration feature
router.post("/register", async (req, res) => {
  let secrets = await getSecret();

  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  const params = {
    TableName: secrets.user_table_name,
    Item: {
      id: { S: short() },
      email: { S: req.body.email },
      username: { S: req.body.username },
      password: { S: req.body.pwd },
    },
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.error("Insertion Error ", err);
    } else {
      console.log("Insertion Successful ", data);
    }
  });
  res.send({
    message: "Success",
  });
});

//view car feature
router.get("/viewcar", async (req, res) => {
  let secrets = await getSecret();

  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName: secrets.car_table_name,
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const result = data.Items.map((index) => {
        return AWS.DynamoDB.Converter.unmarshall(index);
      });
      res.send(result);
    }
  });
});

//subscription feature
router.post("/subscribe", async (req, res) => {
  let secrets = await getSecret();
  const sns = new AWS.SNS({ region: "us-east-1" });

  const params = {
    Protocol: "email",
    TopicArn: secrets.sns_arn,
    Endpoint: req.body.email,
  };

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
  res.send({
    message: "Success",
  });
});

module.exports = router;
