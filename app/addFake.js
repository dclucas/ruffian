function addFake(server, fake) {
    server.route({
        method: fake.method,
        path: fake.path,
        handler: function (request, reply) {
            reply(fake.payload);
        }
    });
}

module.exports = addFake;