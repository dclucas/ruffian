const logger = require('./logger');

function addFake(server, fake) {
    logger.info(`Adding ${fake.method} ${fake.path} fake.`);
    server.route({
        method: fake.method,
        path: fake.path,
        handler: function (request, reply) {
            reply(fake.payload);
        }
    });
}

module.exports = addFake;