//So far we have written code with the assumption that all messages are passed whole.
//However this is no always true, in fact, it is a best case scenario. In the "wild" more often than not,
//messages are passed in chunks and are received split into one or more parts. This is known as the Message-Boundry Problem.
//The LDJ (Line-Delimited JSON - defined on page 30) protcol corrects this by setting message boundries. It does this by //seperating messages with
//newline characters. Each newline character (\n) is the boundry between two messages.
//This test differs from the previous 'net-watcher-json-service' by instead of setting up a file-system (fs) watcher,
//here we just return the first PREDETERMINED chunk immediately.

'use strict';
const
	
	net = require('net'),
	server = net.createServer(function(connection){

		console.log('Subscriber has connected');

		//send the first chunk immediately
		connection.write(
			'{"type":"changed", "file":"targ'
			);

		//after one second delay, send the other chunk
		let timer = setTimeout(function(){
			connection.write('et.txt", "timestamp":135848484848}' + "\n");
		}, 1000);

		//clear timer when the connection ends
		connnection.on('end', function(){
			clearTimeout(timer);
			console.log('Subscriber disconnected');
		});

	});

	server.listen(5432, function(){
		console.log('Test server listening for subscbribers....');
	});
