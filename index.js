'use strict'
const cfg = require('./app/config');
const server = require('./app/server')(cfg);
const addFake = require('./app/addFake');

server.then((s) => {
    addFake(s, {
        method: 'GET',
        path: '/bar',
        payload: 'foo'
    });

    console.log(`server running at ${s.info.uri}`)
});