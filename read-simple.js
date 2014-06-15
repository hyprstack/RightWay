//There are different ways to reading and writing files in Node.
//In this example we will be reading the whole-file-at-once.
//This code should echo the contents of the file on the command-line if the file has any content
//or a blank line if the file contains nothing

const fs = require ('fs');
fs.readFile('target.txt', function (err, data) {
	if (err) {
		throw err;
	}
	console.log(data.toString);
});