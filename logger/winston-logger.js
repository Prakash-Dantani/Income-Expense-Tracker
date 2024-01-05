const winston = require("winston");
require('winston-daily-rotate-file');
const fs = require('fs');

let logType = "error";
// Function which will return current Date
function getDirName(){ // returns current YYYY-MM
    var curDate = new Date();
    var curMonth = ("0" + (curDate.getMonth() + 1)).slice(-2);
    var curYYYYMM = curDate.getFullYear() + "-" + curMonth;
    return curYYYYMM;
}

// Initialize the transport with the proper folder for the current month.
const transport = new winston.transports.DailyRotateFile({
    dirname:'logs/'+logType+'/'+ getDirName(),
    filename: 'log-%DATE%',
    datePattern: 'DD-MM-YYYY', // rotates every day
});

transport.on('rotate', function (_, _) {
    console.log('Log Type : '+logType);
    // Each time there is a file rotation (= every day with this date pattern), if there is not yet
    // a folder with the current name = if the month changed, then create a new transport and
    // set its directory to the new month:
    if (!fs.existsSync('logs/error/' + getDirName() + '/')) {
        transport = new winston.transports.DailyRotateFile({
            dirname:'logs/error/'+ getDirName(),
            filename: 'log-%DATE%',
            datePattern: 'DD-MM-YYYY',
        });
    }
});


// Error Log Function
const errorLog = winston.createLogger({
    level:"error",
    format:winston.format.json(),
    defaultMeta:{service:'user-service'},
    transports:[
        // new winston.transports.Console(),
        transport
    ]
});

module.exports.errorLogger = errorLog;

// Information Log Function
const infoLogger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'user-service'},
    transports:[
        new winston.transports.Console(),
        transport
    ]
});

module.exports.infoLogger = infoLogger;



