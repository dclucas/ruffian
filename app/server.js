'use strict';

module.exports = function(config) {
    const Hapi = require('hapi');
    const server = new Hapi.Server();
    const Joi = require('joi');
    const addFake = require('./addFake');
    //fixme: use destructuring
    server.connection({ port: config.port });

    //todo: make ruffian's endpoints configurable
    server.route({
        method: 'POST',
        path: '/ruffian/fakes',
        config: {
            validate: {
                payload: {
                    method: Joi.string().valid('GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD', 'OPTIONS').required(),
                    path: Joi.string().required(),
                    payload: Joi.any().required()
                }
            }
        },
        handler: function(request, reply) {
            addFake(server, request.payload);
            reply().code(200);
        }
    });

    return new Promise(function(resolve, reject) {
        server.start(function(err) {
            if (err) reject(err);
            resolve(server); 
        });
    });
}
