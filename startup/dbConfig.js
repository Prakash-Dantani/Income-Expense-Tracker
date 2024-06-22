require('dotenv').config();
const mongoose= require("mongoose");
const {infoLogger, errorLogger} = require('../logger/winston-logger');
 
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const database = process.env.MONGODB_DATABASE;

// // const uri = 'mongodb://localhost:27017/income-expance-tracker' // For Local Database
const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => {
    console.error("Connection error", err);
  });