# Ruffian

## What

Ruffian is a hapi-based server that allows developers to easily set up fake 
servers for isolated testing.

## Why

There are, of course, alternatives to isolating your tests from external components:

* you can isolate the modules in your code that interact with external services and mock them (using sinon, for example);

* you can use a library that mocks the `http` library itself (such as nock);

These approaches have their cases for best usage and the purpose here is not to prove that setting up a fake 
server is a better approach. But there are situations in which this leads you to a better test structure.

If you are leveraging practices such as:

1. using contract-driven tests to check your external dependencies;
2. using a service composition tool such as docker-compose to set up your target environment;

then ruffian may be the tool for you. Use the contracts from item #1 to set up your request/response expectations, bring 
a ruffian app within a container so that you can manually exercise your code, in case you choose to.

## How: installation

You can install ruffian as a global tool:
```
npm install -g ruffian
```
And then start it through the cli:
```
ruffian
```

You can also clone this repo and start the server by doing:
```
npm install
npm start
```

## How: setting up fakes through the CLI

You can pass a JSON file to the CLI:

```
ruffian -f fakes.json
```

Ruffian expects the file to contain an array of objects, each with the following attributes:
* method: the HTTP verb to respond to. Possible values: GET, POST, PATCH, PUT, 
HEAD, OPTIONS
* path: route from ruffians root "/". All routes must start with a backslash. 
Ruffian accepts any format supported by hapi
* payload: the payload Ruffian should return when the endpoint is exercised

## How: setting up fakes through the REST interface

Once the server is running, you can configure behavior by posting data to the 
`ruffian/fakes` endpoint:

```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: ea3a34e1-ee5b-53a6-59e5-caf6fe5bc400" -d '{
	"method": "GET",
	"path": "/foo",
	"payload": "bar!"
}' "http://localhost:3000/ruffian/fakes"
```

## How: setting up fakes through the module

TO-DO: finish lib handling and document how-to
