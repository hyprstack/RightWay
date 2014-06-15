//Writing a file using the whole-file-at-once
//This code allows you to write the message "A new message" into target.txt

const fs = require('fs');
fs.writeFile('target.txt', 'A new message', function (err) {
	if (err) {
		throw err;
	}
	console.log("File saved!");
});