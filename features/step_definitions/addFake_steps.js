module.exports = function () {
    const uuid = require('uuid');
    const port = 3000;
    const payload = {
        method: 'GET', 
        payload: uuid.v4() 
    };
    const expect = require('chai').expect;
    const addFake = require('../../app/addFake');
    const got = require('got');
    //todo: consider removing the hard-coded value below
    const baseUrl = 'localhost:3000';
    const config = require('../../app/config');
    const server = require('../../app/server')(config);
    const R = require('ramda');

    var path;
    var response;

    this.Given(/^a running ruffian server$/, function () {
        return server;
    });

    this.When(/^I send it a payload for a fake (.*) endpoint$/, function (endpoint) {
        path = endpoint;
        return got.post(`${baseUrl}/ruffian/fakes`, {
            body: R.assoc('path', endpoint, payload)
        })
        .then(r => response = r);
    });    

    this.Then(/^it accepts my fake$/, function () {
        expect(response.statusCode).to.equal(200);
    });

    this.Then(/^it returns the expected response upon fake execution$/, function () {
        return got(`${baseUrl}${path}`)
        .then(r => {
            expect(r.body).to.equal(payload.payload);
            return r;
        });
    });    
}
