module.exports = function () {
    const uuid = require('uuid');
    const port = 3000;
    var payload = {
        method: 'GET', 
        payload: uuid.v4() 
    };
    const expect = require('chai').expect;
    const addFake = require('../../app/addFake');
    const got = require('got');
    //todo: consider removing the hard-coded value below
    const baseUrl = 'localhost:3000';
    const config = require('../../app/config');
    const R = require('ramda');
    const child_process = require('child_process');

    var path;
    var response;

    this.Given(/^a running ruffian server$/, function () {
        return require('../../app/server')(config).then(s => this.server = s);
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

    this.Given(/^a set of fakes$/, function () {
        payload = require('../fixtures/fakes-set');
    });

    this.When(/^I start a server and pass them as an argument$/, function () {
        return require('../../app/server')(config, payload)
        .then(s => this.server = s);
    });  

    this.Then(/^the server configures all endpoints$/, function () {
        // no action here -- load already happened
    });

    this.Then(/^it returns the expected response for each fake$/, function () {
        return Promise.all(
            payload.map(f =>
                got[f.method.toLowerCase()](`${baseUrl}${f.path}`)
                .then(response => {
                    expect(response.body).to.equal(f.payload);
                    return response;
                })
                .catch(function(err) {
                    expect(err, `${f.method} request against ${f.path} failed.`).to.be.undefined;
                })
            )
        );
    });

    this.When(/^I start the CLI and pass it as an argument$/, function () {
        this.ruffianProcess = child_process.exec('bin/ruffian -f features/fixtures/fakes-set.json');
    });

    this.Then(/^ruffian starts up successfully$/, function () {
        //fixme: even though the next step will check this too, there should be 
        // code here to check if the server is up and running. Do a quick GET on /ruffian/fakes
        // when this handler is implemented.
    });    
}
