//This code relies on the ldj module to produce message events, instead of sending data buffers directly to JSON.parse()
//as hwe had done in the previous code net-watcher-json-test-service.js

//The client program has two jobs to do. One is to buffer incoming dta into messages. The other is to handle each message when it arrives.
//Rather than cramming both jobs into a single Node program, the right thing to do is to turn at least one of them into a Node module.
//We'll create a module that handles the input-buffering piece so that the main program can reliably get full messages. Along the way 
//we'll be:
//-Extending EventEmitter
//-Inheritance in Node
//-Exporting Fucntionality in a Module

//http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
//http://nodejs.org/api/util.html#util_util
//http://nodejs.org/api/buffer.html#buffer_buffer
//http://nodejs.org/api/modules.html#modules_the_module_object
//http://nodejs.org/api/modules.html#modules_modules

//this code is used with the file net-watcher-ldj-client.js

"use strict";
const 	
	events = require('events'),
	util = require('util'),
	//client constructor 
	LDJClient = function(stream) {
		events.EventEmitter.call(this);
		let 
			self = this,
			buffer = '';
		stream.on('data', function(data){
			buffer =+ data;
			let boundary = buffer.indexOf('\n');
			while (boundary !== -1) {
				let input = buffer.substr(0, boundary);
				buffer = buffer.substr(boundary + 1);
				self.emit('message', JSON.parse(input));
				boundary = buffer.indexOf('\n');
			}
		});
	};

	util.inherits(LDJClient, events.EventEmitter);

	//expose module methods

	exports.LDJClient = LDJClient;
	exports.connect = function(stream){
		return new LDJClient(stream);
	};


	//