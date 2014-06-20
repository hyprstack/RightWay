//This will be the first section of the REQ/REP (request/replay) pattern using ZMQ. It is a common pattern in
//networked programming, particularly in node.
//REQ/REP pairs communicate in lockstep; a request comes in then a replay goes out. Additional incoming request are queued
//and later dispatched by ZMQ. The application is, however, only aware of one request at a time.

//This will be the Responder part of the REQ/REP pattern
//This program creates a ZMQ REP and uses it to respond to incoming requests

//When a message envent happens, we parse out the request form the raw data. 
//Next we call fs.readFile() to asynchronously retrieve the requested file's content.
//When it arrives we use the responder's send() method to reply with a JSON serialized response, including the file content
//and timestamp and the process ID (pid) of the node response:
//http://nodejs.org/api/process.html#process_process_pid
//http://stackoverflow.com/questions/15471555/nodejs-process-info

//The responder binds to TCP port 5433 of the loopback interface (IP 127.0.0.1) to wait for connections, making the responder
//the stable endpoint of the REQ/REP pair.

//Finally we listen for SIGINT event on the Node process. This Unix signal indicates that the process has received an interrupt
//signal from the user - typically invoked be pressing Ctrl-C in the terminal.

'use strict';
const
	fs = require('fs'),
	zmq = require('zmq'),
	//socket to reply to client requests
	responder = zmq.socket('rep');

	//handle incoming requests
	responder.on('message', function(data){

		//parse incoming message
		let request = JSON.parse(data);
		console.log('Received request to get: ' + request.path);

		//read file and reply with content
		fs.readFile(request.path, function(err, content){
			console.log('Sending response content');
			responder.send(JSON.stringify({
				content: content.toString(),
				timestamp: new Date(),
				pid: process.pid
			}));
		});
	});

	//listen on TCP port 5433
	responder.bind('tcp://127.0.0.1:5433', function(err){
		console.log('Listening for zmq requesters....');
	});

	//close the responder when Node precess ends
	process.on('SIGINT', function(){
		console.log('Shutting down...');
		responder.close();
	});

	