//working with couchDB
//making REST ful requests

#!/usr/bin/env node --harmony
const
	request = require('request'),
	option = {
		method: process.argv[2] || 'GET',
		url: 'http://localhost:5984/' + (process.argv[3] || '')
	};
request(options, function(err, res, body){
	if(err) {
		throw Error (err);
	} else {
		console.log(res.statusCode, JSON.parse(body));
	}
});
