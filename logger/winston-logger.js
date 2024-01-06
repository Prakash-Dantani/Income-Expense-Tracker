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
const errorTransport = new winston.transports.DailyRotateFile({
    dirname:'logs/error/'+ getDirName(),
    filename: 'log-%DATE%',
    datePattern: 'DD-MM-YYYY', // rotates every day
});

errorTransport.on('rotate', function (_, _) {
    // Each time there is a file rotation (= every day with this date pattern), if there is not yet
    // a folder with the current name = if the month changed, then create a new transport and
    // set its directory to the new month:
    if (!fs.existsSync('logs/error/' + getDirName() + '/')) {
        errorTransport = new winston.transports.DailyRotateFile({
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
        errorTransport
    ]
});

module.exports.errorLogger = errorLog;

// Initialize the transport with the proper folder for the current month.
const infoTransport = new winston.transports.DailyRotateFile({
    dirname:'logs/info/'+ getDirName(),
    filename: 'log-%DATE%',
    datePattern: 'DD-MM-YYYY', // rotates every day
});

infoTransport.on('rotate', function (_, _) {
    // Each time there is a file rotation (= every day with this date pattern), if there is not yet
    // a folder with the current name = if the month changed, then create a new transport and
    // set its directory to the new month:
    if (!fs.existsSync('logs/info/' + getDirName() + '/')) {
        infoTransport = new winston.transports.DailyRotateFile({
            dirname:'logs/info/'+ getDirName(),
            filename: 'log-%DATE%',
            datePattern: 'DD-MM-YYYY',
        });
    }
});


// Information Log Function
const infoLogger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'user-service'},
    transports:[
        new winston.transports.Console(),
        infoTransport
    ]
});

module.exports.infoLogger = infoLogger;



