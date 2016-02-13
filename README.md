# MY IP UI
<img align="right" width="58" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-logo.png">
MY IP UI - is a UI tool built for easy opening development url on any mobile device.

## How it works
MY IP UI was built on top of [EXPRESS](http://expressjs.com) so if you would like to use it, your server should use express js.
- [MY IP](https://github.com/AtuyL/my-ip) - gets current IP address.
- [QR-IMAGE](https://github.com/alexeyten/qr-image) - generates QR-code SVG based on current IP address.
- UI WRAPPER - wraps QR-code SVG to custom UI.
- [INJECT-HTML](https://github.com/alessioalex/inject-html) - injects UI WRAPPER to every page served by http server.

## Usage
```js
var express  = require('express');
var myipui   = require('myip-ui');

var server   = express();
var port     = 3000();

server.use(myipui({ port: port }));
server.use(express.static('./dest'));

server.listen(port, function(res, req){
	console.log('Server started!');
});

```
