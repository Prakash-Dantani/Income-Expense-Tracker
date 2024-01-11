const mongoose= require("mongoose");
const {infoLogger, errorLogger} = require('../logger/winston-logger');
 
mongoose.connect('mongodb://localhost:27017/income-expance-tracker')
.then(()=> infoLogger.info("DB Connected"))
.catch(err=> {console.log(err); errorLogger.error(err)});