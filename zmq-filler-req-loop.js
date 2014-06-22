//There is a catch using ZMQ REP/REQ socket pairs with Node. Each end-point of the application operates on
//only one request or one response at a time. There is no parallelism.
//We can see this is action by changing the zmq-filer-req.js file and wrapping the section that sends the request
//in a for loop.
//By doing this the program sends a response to each request before even becoming aware of the next queued request.
//This means that Node's event loop is let spinning while the fs.readFile() for each request is being processed.



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
//This is the changed section
for( let i=1; i<=3; i++) {
console.log("Sending request " + i + " for " + filename);
requester.send(JSON.stringify({
	path: filename
}));
}