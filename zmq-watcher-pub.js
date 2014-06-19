//This is the first part of a PUBLISH/SUBSCRIBE pair, being this the publish half.
//Instead of requiring the net module, we will call the zmq module. We use it to create a publisher endpoint
//by calling zmq.socket('pub')
//Importantly we only have one call to fs.watch(). Here we have just one file-system watcher, which invokes the 
//publisher's send() method.
//The string sent to publisher.send() is the output of JSON.stringify(). ZMQ does no formating of messages.
//It is our job to serialize and deserialize any messages we send through ZMQ.
//Finally we call publisher.bind('tcp://*5432') to tell ZMQ to listen on TCP port 5432


'use strict';
const
	fs = require('fs'),
	zmq = require ('zmq'),

	//create publisher endpoint
	publisher = zmq.socket('pub'),

	filename = process.argv[2];

	fs.watch(filename, function(){
		//send message to any subscribers
		publisher.send(JSON.stringify({
			type: 'changed',
			file: filename,
			timestamp: new Date()
		}));
	});

	//listen to TCP port 5432
	publisher.bind('tcp://*:5432', function (err){
		console.log('Listening for zmq subscribers...');
	});