var http = require('http'),
url = require('url'),
fs = require('fs'),
zlib = require('zlib');

const PORT = 3000;

function handleRequest(request, response){
	var pathname = url.parse(request.url).pathname;
	
	if(pathname === '/gzip') {
		var gzipFile = fs.createWriteStream('compressedFile.txt.gz');
		var gzip = zlib.createGzip();
		var requestBody = '';

		request.on('data', function (chunk) {
			requestBody += chunk;
			gzip.write(requestBody);
			gzip.end();
			gzip.on('finish', function() {
				var compressed = gzip.pipe(gzipFile);
				compressed.on('finish', function() {
					gzipFile.end();
					response.write('File is compressed');
					response.end();
				});
			});
		});

	} else if(pathname === '/ungzip') {
		var gunzip = zlib.createGunzip();
		var gzipFile = fs.createReadStream('compressedFile.txt.gz');
		var uncompressed = gzipFile.pipe(gunzip);

		uncompressed.on('finish', function(){
			var output = gunzip.pipe(response);
			output.on('finish', function(){
				response.end();
			});
		});
	}
}
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Server is listening on:" + PORT);
});
