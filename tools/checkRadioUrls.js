/*
 * Check URL of radios from OpenKarotz MUI radio.json data file.
 * usage: node checkRadioUrls.js
 */

// Uncaught errors
process.on('uncaughtException', function (err) {
	console.error('An uncaught error occurred!');
	console.error(err.stack);
});

// Do the job for the given category
function checkCategory(category) {
	console.log('-- ' + category.name + ' --');
	var count = 0;

	category.radios.forEach(function(radio) {

		/*
		// Proxy mode
		var options = {
				hostname: 'proxy',
				port: 8080,
				path: radio.url,
				method: 'GET'
		};
		*/
		// Direct URL mode
		var options = radio.url;

		var http = require('http');
		var req = http.request(options, function (response) {
			if (response.statusCode == 200) {
				console.log('Radio ' + radio.id + ' -> OK');
			} else if (response.statusCode == 301 || response.statusCode == 302) {
				console.log('Radio ' + radio.id + ' -> OK (Redirect)'); // + response.headers.location);
				//console.log(response.headers);
			} else if (response.statusCode == 404) {
				console.log('Radio ' + radio.id + ' -> DOWN (404)');
			} else if (response.statusCode == 503) {
				console.log('Radio ' + radio.id + ' -> Service unavailable (503)');
			} else {
				console.log('Radio ' + radio.id + " -> DOWN: status = " + response.statusCode);
				console.log(response.headers);
			}
		});
		req.on('error', function(e) {
			console.log('Radio ' + radio.id + ' -> Problem with request: ' + e.message);
		});
		req.end();

		count++;
	});

	console.log(category.name + " count = " + count);
}

var radios = require('../html/data/radios.json');

checkCategory(radios.france);
checkCategory(radios.international);
//checkCategory(radios.francebleu);



