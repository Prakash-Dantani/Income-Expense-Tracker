const mongoose= require("mongoose");
const winston= require("winston");
 
mongoose.connect('mongodb://localhost:27017/income-expance-tracker')
.then(()=> winston.info("DB Connected"))
.catch(err=> console.error(err));