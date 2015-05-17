var _ = require('underscore');

function Operations(data) {
	this.data = data;
	
	this.sort = function(data) {
		return _.sortBy(this.data);
	}
	this.min = function(data) {
		return _.min(this.data);
	}
	this.max = function(data) {
		return _.max(this.data);
	}
}

exports.get_operation = function(data) {
	return new Operations(data);
}