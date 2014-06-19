//Here we will be implementing the subscriber part of PUB/SUB pair.
//It uses zmq.socket('sub') to make a subscriber endpoint
//Calling subscriber.subscribe("") tells ZMQ that we want to receive all messages. If you only want certain messages
//you can provide a string that acts as a prefix filter. You wont receive any messages until you call subsrcib at some point
//in your code.
//The subscriber object inherits from eventEmitter. It emits a message event whenever it receives one from a publisher, so
//we use subscriber.on() to listen for them.
//Lastly, we use subscriber.connect() to establish the client end of the connection.

'use strict';
const
	zmq = require('zmq'),

	//create subscriber endpoint
	subscriber = zmq.socket('sub');

	//subscibe to all messages
	subscriber.subsrcibe("");

	//handle messages from publisher
	subscriber.on("message", function(data){
		let
			message = JSON.parse(data),
			date = new Date(message.timestamp);
		console.log("File '" + message.file + " ' changed at " + date);
	});

//connect to publisher
subscriber.connect("tcp://localhost:5432");