//This is the second part of the REQ/REP pair.
//This program starts off by creating a ZMQ REQ socket.
//Then it listen for incoming message events and interprets the data as a JSON serialized response.
//The end of the program kicks off the request by connecting to REP socket over TCP and finally calling
//requester.send(). 
//The JSON request message contains the requested file's path as specified on the command line

'use strict';
const
	zmq = require('zmq'),
	filename = process.argv[2],
	//create request endpoint
	requester = zmq.socket('req');
//handle replies from messanger
requester.on('message', function(data){
	let response = JSON.parse(data);
	console.log("Received response:", response);
});

requester.connect("tcp://localhost:5433");
//send request for content
console.log("Sending request for " + filename);
requester.send(JSON.stringify({
	path: filename
}));