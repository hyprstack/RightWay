//This code writes data to a Socket.
//It begins by reporting that the connection has been established (both to the client with 'connection.write' and to the console)
//It then begins listening for changes to the target file, saving the returned 'watcher' object.
//This callback sends change information to the client using 'connection.write'
//It then listens for the connection's 'close' event so it can report that the subscriber has disconnected and stops
//watching the file, with 'watcher.close'
//In the book under the 'watcher setup' code, I have replaced 'Date.now()' with 'new Date()', so that the date is humanly readable.
//http://nodejs.org/api/net.html#net_net

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
			connection.write("File '" + filename + "' changed: " + new Date() + "\n");
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