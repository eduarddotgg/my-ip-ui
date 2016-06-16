var injectCode = require('inject-html');
var myIP       = require('my-ip');
var qr         = require('qr-image');

module.exports = function(opts){
	opts = opts || {};

	return function(req, res, next){

		var url = 'http://' + myIP() + ':' + opts.port + req.originalUrl;
		var qrCode = qr.imageSync(url, {type: 'svg'});

		var css = "<style>.my-ip-ui{background: rgba(0, 0, 0, .9); box-sizing: border-box; display: block; left: 0; opacity: 0; padding: 10px 20px; position: fixed; top: 0; width: 100%; transition: all .3s ease; -webkit-transition: all .3s ease; -moz-transition: all .3s ease; transform: translate(0, -100%); -webkit-transform: translate(0, -100%); -moz-transform: translate(0, -100%); z-index: 999999999999;} .my-ip-ui.opened{opacity: 1; transform: translate(0, 0); -webkit-transform: translate(0, 0); -moz-transform: translate(0, 0)} .my-ip-ui__qr-code{background: rgba(255, 255, 255, 1); box-sizing: border-box; display: block; margin: 20px auto; max-width: 200px; padding: 20px; width: 100%} .my-ip-ui__qr-code svg{box-sizing: border-box; width: 100%} .my-ip-ui__text--lead{box-sizing: border-box; color: rgba(255, 255, 255, .8); font-family: arial, sans-serif; font-size: 12px; line-height: 22px; margin: 5px auto; max-width: 400px; text-align: center} .my-ip-ui__text{box-sizing: border-box; color: rgba(255, 255, 255, .8); font-family: arial, sans-serif; font-size: 12px; line-height: 22px; margin: 5px auto; max-width: 400px; text-align: center} .my-ip-ui__text a{color: rgba(255, 255, 255, .8)} .my-ip-ui__text a:hover{color: rgba(255, 255, 255, .8); text-decoration: none} .my-ip-ui--open-button{background: rgba(0, 0, 0, .8); border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; color: #fff; cursor: pointer; display: block; float: left; font-family: arial, sans-serif; font-size: 12px; left: 50%; padding: 5px 20px; position: absolute; top: 0; transition: all .3s ease; -webkit-transition: all .3s ease; -moz-transition: all .3s ease; transform: translate(-50%, -100%); -webkit-transform: translate(-50%, -100%); -moz-transform: translate(-50%, -100%)} .my-ip-ui--open-button.hide-text{background: rgba(255, 255, 255, .9); color: rgba(0, 0, 0, 1)} .my-ip-ui--open-button .show-text, .my-ip-ui--open-button.hide-text .hide-text{display: block} .my-ip-ui--open-button .hide-text, .my-ip-ui--open-button.hide-text .show-text{display: none} html:hover .my-ip-ui--open-button{transform: translate(-50%, 0); -webkit-transform: translate(-50%, 0); -moz-transform: translate(-50%, 0)} @media screen and (min-width: 480px){.my-ip-ui{padding: 40px 20px} .my-ip-ui__qr-code{ max-width: 300px; margin: 40px auto}}</style>";

		var ui = "<div id='myipui' class='my-ip-ui'><div class='my-ip-ui__wrapper'><div class='my-ip-ui__text--lead'>Your current url is: " + url + "</div><div class='my-ip-ui__text'>Use this QR-code to open this URL on any device.</div><div class='my-ip-ui__qr-code'>" + qrCode + "</div><div class='my-ip-ui__text'>Make sure that all devices are using same local network.</div></div><div class='my-ip-ui__wrapper'><div class='my-ip-ui__text'>Thank you for using MY IP QR UI! For more information visit <a href='https://github.com/admdh/my-ip-ui' title='link to github' target='_blank'>https://github.com/admdh/my-ip-ui</a></div></div></div><div id='myipuiopenbutton' class='my-ip-ui--open-button'><span class='show-text'>Show My IP</span><span class='hide-text'>Hide My IP</span></div>";

		var script = "<script>function toggleClass(element, className){ if (!element || !className){ return; } var classString = element.className, nameIndex = classString.indexOf(className); if (nameIndex == -1) { classString += ' ' + className; } else { classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length); } element.className = classString; } document.getElementById('myipuiopenbutton').addEventListener('click', function() { toggleClass(document.getElementById('myipui'), 'opened'); toggleClass(document.getElementById('myipuiopenbutton'), 'hide-text'); });</script>"

		var injectJsFiles = injectCode({
			code: css + ui + script
		});

		injectJsFiles(req, res, next);
	}

}