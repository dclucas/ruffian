# Ruffian

## Intro

Ruffian is a hapi-based server that allows developers to easily set up fake 
servers for isolated testing.

## Installation

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

## Setting up fakes through the CLI

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

## Setting up fakes through the REST interface

Once the server is running, you can configure behavior by posting data to the 
`ruffian/fakes` endpoint:

```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: ea3a34e1-ee5b-53a6-59e5-caf6fe5bc400" -d '{
	"method": "GET",
	"path": "/foo",
	"payload": "bar!"
}' "http://localhost:3000/ruffian/fakes"
```

## Setting up fakes through the module

TO-DO: finish lib handling and document how-to
