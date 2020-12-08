# GUS plugin
This plugin provides support for fetching GUS data. Plugin exposes
single rest endpoint:
- GET /gus/:taxvat - fetches corporation information based on tax vat number

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage
* Get corporation information
```shell script
curl -X GET "localhost:8080/api/vendor/gus/{taxvat}"
```
