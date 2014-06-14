//This file takes the file to watch as a command-line argument. This will be relevant when we initiate the code; We have to define
//the target file on the command-line.

const
	fs = require ('fs'),
	filename = process.argv[2];
if (!filename) {
	throw Error ("A file to watch must be specified!");
}
fs.watch(filename, function () {
	console.log("File " + filename + "just changed!");
});
console.log("Now watching " + filename + "for changes ...");