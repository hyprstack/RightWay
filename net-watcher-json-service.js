//So far our example programs have sent plain-text messages that are human readable. 
//This code will desing and implement a protocol based on passong JSON encoded messages.
//This is yet another modification of the 'net-watcher' program.
//See : http://json.org

'use strict';
const
	
	fs = require('fs'),
	net = require('net'),

	filename = process.argv[2],

	server = net.createServer(function (connection) {
		//reporting
		console.log('Subscriber connected.');
		connection.write(JSON.stringify ({
			type: 'watching',
			file: filename
		}) + '\n');

		//watcher setup
		let watcher = fs.watch(filename, function(){
			connection.write(JSON.stringify ({
				type: 'changed',
				file: filename,
				timestamp: new Date()
			}) + "\n");
		});

		//cleanup
		connection.on('close', function(){
			console.log('Subscriber disconnected.');
			watcher.close();
		});

	});

	if (!filename) {
		throw Error('No target filename was specified.');
	}

	server.listen(5432, function (){
		console.log('Listening for subscribers...');
	});