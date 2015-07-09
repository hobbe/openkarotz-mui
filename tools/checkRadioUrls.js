
// Uncaught errors
process.on('uncaughtException', function (err) {
	console.error('An uncaught error occurred!');
	console.error(err.stack);
});

var logError = function(error, stdout, stderr) {
	var sys = require('sys');
    sys.puts(stdout);
    //sys.print('stdout: ' + stdout);
    //sys.print('stderr: ' + stderr);
    if (error) {
		console.log('exec error: ' + error);
	}
}

var execute = function(command) {
	var exec = require('child_process').exec;
	console.log('exec: ' + command);
	return exec(command, logError);
}

function checkCategory(category) {
	console.log('-- ' + category.name + ' --');
	var count = 0;

	category.radios.forEach(function(radio) {
		var options = {
				hostname: 'proxy',
				port: 8080,
				path: radio.url,
				method: 'GET'
		};
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
			console.log('problem with request: ' + e.message);
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



