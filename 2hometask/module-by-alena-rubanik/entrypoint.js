var submodel = require('./src/internal-submodule.js');

console.log(submodel);

exports.get_result = function() {
	var list = [2, 6, 1, 3, 7],
		newList = [];
	var arrayMethods = submodel.get_operation(list);
	var sortArray = arrayMethods.sort();
	var minArrayValue = arrayMethods.min();
	var maxArrayValue = arrayMethods.max();
	newList.push(sortArray, minArrayValue, maxArrayValue);
	
	return newList;
}