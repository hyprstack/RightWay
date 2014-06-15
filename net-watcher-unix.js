//Unix sockets work if you need processes to comunicate on the same computer. The net module can create this kind of
//sockets as well. Lets modify the 'net-watcher' file to use this kink of communication channel.
//All we wil change from 'net-watcher' to this file is the 'server-listen' section.

'use strict';
const
	
	fs = require('fs'),
	net = require('net'),

	filename = process.argv[2],

	server = net.createServer(function (connection) {
		//reporting
		console.log('Subscriber connected.');
		connection.write("Now watching '" + filename + "' for changes ... \n");

		//watcher setup
		let watcher = fs.watch(filename, function(){
			connection.write("File '" + filename + "' changed: " + Date.now() + "\n");
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

	server.listen('/tmp/watcher.sock', function (){
		console.log('Listening to subscribers...');
	});