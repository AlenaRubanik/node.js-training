'use strict'
var spawn = require('child_process').spawn,
	fs = require('fs');

function _getCurrentDate() {
	var date = new Date(),
		month = (date.getMonth() + 1).toString(),
		monthChars = month.split('');
	return date.getDate().toString() + (monthChars[1] ? month : "0" + monthChars[0]) + date.getFullYear().toString();	
}

function _setNewFileName(filename, currentDate) {
	return filename.split('.')[0] + currentDate + '.txt';	
}

function Methods(data) {
	this.value = data;
	
	this.copy = function(value) {
		var currentDate = _getCurrentDate();
		var filename2 = _setNewFileName(value, currentDate);
		let copyObj = spawn('xcopy', [value, filename2 + '*', '/y']);
	}
	
	this.del = function(value) {
		let delObj = spawn('cmd', ['/c', 'del', value]);
	}
	
	this.index = function(value, callback) {
		var textFilesStack = [];
		fs.readdir(value, function(err, stack){					   
			if(stack.length) {
				for(var i = 0; i < stack.length; i++) {
					if(stack[i].indexOf('.txt') > -1) {
						textFilesStack.push(stack[i]);
					}
				}
				return callback(null, textFilesStack);
			} else if (err) {
				console.log('Error reading directory ' + dir);
				return callback(err);
			}
		});
	}
}

exports.method_operation = function(data) {
	return new Methods(data);
}