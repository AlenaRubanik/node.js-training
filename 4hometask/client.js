var http = require('http'),
fs = require('fs'),
q = require('q');

var filename = process.argv[2];
var fileToSend = fs.createReadStream(filename);

var postOptions = {
    host: 'localhost',
    port: 3000,
    path: '/gzip',
    method: 'POST'
};
var getOptions = {
    host: 'localhost',
    port: 3000,
    path: '/ungzip',
    method: 'GET'
};

var getCallback = function(response) {
    var str = '';
    response.on('data', function (chunk) {
        str += chunk;
        var dir = '.';
        fs.mkdir(dir + '/output/', 0777, function(err) {
            if (err) {
                if (err.code == 'EEXIST') {
                    fs.writeFile(dir + '/output/' + filename, str, function () {});
                }
            } else {
                fs.writeFile(dir + '/output/' + filename, str, function () {});
            }
        });
    });
    response.on('end', function () {});
};

var postCallback = function(response) {
    response.on('data', function (body) {
        deferred.resolve();
    });
    response.on('error', function(e) {
        deferred.reject();
    });
    response.on('end', function () {
        var promise = deferred.promise;
        promise
            .then(function() {
                http.request(getOptions, getCallback).end();
            }, function(error) {
                console.log('Promise failed', error);
            });

    });
};

var request = http.request(postOptions, postCallback);

var deferred = q.defer();
var sendPost = fileToSend.pipe(request);
sendPost.on('finish', function () {
    request.end();
});