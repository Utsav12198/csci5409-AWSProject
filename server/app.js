const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
const app = express();
const route = require("./router");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

AWS.config.update({
  aws_access_key_id: process.env.aws_access_key_id,
  aws_secret_access_key: process.env.aws_secret_access_key,
  aws_session_token: process.env.aws_session_token,
  region: "us-east-1",
});

app.use("/awsbackend", route);

app.listen(port, () => {
  console.log("listening to port " + port);
});
