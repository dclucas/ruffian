'use strict'

const logger = require('winston');
logger.configure({
    transports: [
        new (logger.transports.Console)({ json: false, timestamp: true }),
    ]
});
module.exports = logger;