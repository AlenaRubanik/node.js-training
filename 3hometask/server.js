var http = require('http'),
	fileMethods = require('file-managing'),
	url = require('url');

const PORT = 3000; 

function handleRequest(request, response){
    var queryString = url.parse(request.url, true, true).query;
	var fileName = queryString.file,
		method = queryString.method,
		pathname = url.parse(request.url).pathname;
	var getMethod = fileMethods.method_operation();
	var dir = '.';
	
	if(pathname === '/action') {   //http://localhost:3000/action?method=<method>&filename=<filename>;
		if(method === 'copy') {
			getMethod.copy(fileName);
			response.end('Response end');
		} else if (method === 'delete') {
			getMethod.del(fileName);
			response.end('Response end');
		} 
	} else {   //http://localhost:3000/;
		getMethod.index(dir, function (err, content) {
			var res = content ? content : err;						   
			response.end("Text files: " + res);
		});
	}
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server is listening on:" + PORT);
});
