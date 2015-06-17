'use strict'

var date = new Date(),
	month = (date.getMonth() + 1).toString(),
	monthChars = month.split(''),
	current_date = date.getDate().toString() + (monthChars[1] ? month : "0" + monthChars[0]) + date.getFullYear().toString();
	
const fs = require("fs"),	  
	  spawn = require("child_process").spawn,
	  filename = process.argv[2],	  
	  filename2 = filename.split('.')[0] + current_date + '.txt',
	  method = process.argv[3];
	  
fs.watch(filename, function() {
	if(method === 'Copy') {
		let copyObj = spawn('xcopy', [filename, filename2 + '*', '/y']);
		copyObj.stdout.on('data', function(data) {
			console.log(data.toString());		
		});
	} else if(method === 'Del') {
		let delObj = spawn('cmd', ['/c', 'del', filename]);
	}

});