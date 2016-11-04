'use strict';

module.exports = function(config, fakes = []) {
    const Hapi = require('hapi');
    const server = new Hapi.Server();
    const Joi = require('joi');
    const addFake = require('./addFake');
    const fakeSchema = require('./fakeSchema');
    //fixme: use destructuring
    server.connection({ port: config.port });

    //todo: make ruffian's endpoints configurable
    server.route({
        method: 'POST',
        path: '/ruffian/fakes',
        config: {
            validate: {
                payload: fakeSchema
            }
        },
        handler: function(request, reply) {
            addFake(server, request.payload);
            reply().code(200);
        }
    });

    fakes.forEach(f => addFake(server, f));

    return new Promise(function(resolve, reject) {
        server.start(function(err) {
            if (err) reject(err);
            resolve(server); 
        });
    });
}
