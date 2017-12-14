# Nina.fm website

## Setup
The `index.html` file will attempt to include a `env.js` file from the root.
So you should create this file in the root folder and use it to override javascript variables for development purposes as follows:

```javascript
var auth_server_url = "http://my_auth_server_url";
var stream_url = "http://my_stream_url";
var track_info_url = "http://flux.nina.fm:8000/json.xsl";
var mountpoint = '/stream';
```

## Development
#### Setup
If you want to change the scss stylesheets sources you need to init the dev environment.
```
npm install
```

#### Usage

To build the project assets simply use :
```
gulp build
```
---
You can automate the project build for more comfortable development. 
```
gulp watch
```
