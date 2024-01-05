const mongoose= require("mongoose");
const winston= require("winston");
const {infoLogger, errorLogger} = require('../logger/winston-logger');
 
mongoose.connect('mongodbs://localhostss:27017/income-expance-tracker')
.then(()=> infoLogger.info("DB Connected"))
.catch(err=> {console.log(err); errorLogger.error(err)});