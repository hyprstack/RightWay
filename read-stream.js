//You create a read strem or a write stream by using 'fs.createReadStream' and 'fs.createWriteStream', respectively.
//This code listen for data events from the file stream instead of calling pipe().
//http://nodejs.org/api/stream.html

const
		fs = require('fs');
		stream = fs.createReadStream(process.argv[2]);
	stream.on('data', function(chunk) {
		process.stdout.write(chunk);
	});
	stream.on('error', function(err) {
		process.stderr.write("ERROR: " + err.message + "\n");
	});