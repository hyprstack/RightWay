//This program looks at the client side of the connection
//It receives JSON messages from the 'net-watcher-json-service' program.
//This short program uses 'net.connection' to create a client connection to localhost port 5432, then wait for data. 
//The 'client' object is a Socket, just like the oncoming connection we saw on the server side.

'use strict';
const
	net = require('net'),
	client = net.connect({port: 5432});
client.on('data', function(data){
	let message = JSON.parse(data);
	if (message.type === 'watching') {
		console.log("Now watching: " + message.file);
	} else if (message.type === 'changed') {
		let date = new Date(message.timestamp);
		console.log("File '" + message.file + "' changed at " + date);
	} else {
		throw Error("Unrecognized message type: " + message.type);
	}
});