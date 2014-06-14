//This code will spwan a child process in responde to a change on our target file.
//http://nodejs.org/api/child_process.html
//To understand what 'ls' and '-lh' means go to the following url:
//http://stackoverflow.com/questions/24164621/what-does-ls-and-lh-usr-mean-in-nodejs

"use strict";
const
	fs = require('fs'),
	spawn = require('child_process').spawn,
	filename = process.argv[2];

if (!filename) {
	throw Error ("A file to watch must be specified");
}

fs.watch(filename, function () {
	let ls = spawn('ls', ['-lh', filename]);
	ls.stdout.pipe(process.stdout);
});
console.log("Now watching " + filename + " for changes ...");