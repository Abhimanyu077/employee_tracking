const { createLogger, transports, format } = require("winston");
require("winston-mongodb");


const leaveLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/leaveLogger/leaveLogger.log',
            level: 'info',
            maxsize: 5242880,
            maxFiles: 5,
            colorsize: false,
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(),
                format.printf(info => `level : ${info.level}: ${[info.timestamp]}: ${info.message}`),)
        }),
        new transports.File({
            filename: 'logs/leaveLogger/leaveLogger.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
            colorsize: false,
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(),
                format.printf(error => `level : ${error.level}: ${[error.timestamp]}: ${error.message}`),)
        }),
    ]
})
module.exports = leaveLogger;
