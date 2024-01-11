const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    // // handle uncaught Error or excption //Manually
    // process.on('uncaughtException', (ex) => {
    //     console.log('We Got an uncaught exception.');
    //     winston.error(ex.message, ex);
    // });

    // handle uncaught Error or excption //using winston
    winston.handleException(
        new winston.transports.Console({colorize : true, prettyPrint : true}),
        new winston.transports.File({filename : "uncaughtExceptionLog.log"})
    );


    // unhandle promise rejection
    process.on('unhandledRejection', (ex) => {
        // console.log('We Got an unhandel rejection.');
        // winston.error(ex.message, ex);
        throw ex;
    });

    // winston is used for store and track error log 
    // winston.add(winston.transports.File, {filename : 'logfile.log'});    
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB(
            {
                db: 'mongodb://localhost/vidly',
                level : 'error' // which kind of error logging level we want to store
            }
        ));

}