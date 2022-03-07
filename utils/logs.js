const log4js = require('log4js');

log4js.configure({
    appenders: {
        miLoggerConsole: {type: "console"},
        miLoggerFileWarning: {type: 'file', filename: 'warn.log'},
        miLoggerFileError: {type: 'file', filename: 'error.log'}
    },
    categories: {
        default: {appenders: ["miLoggerConsole"], level:"trace"},
        info: {appenders: ["miLoggerConsole"], level: "info"},
        warn: {appenders:["miLoggerFileWarning"], level: "warn"},
        error: {appenders: ["miLoggerFileError"], level: "error"}
    }
});

module.exports = {
    default:log4js.getLogger(),
    loggerInfo: log4js.getLogger('info'),
    loggerWarn: log4js.getLogger('warn'),
    loggerError: log4js.getLogger('error'),
}