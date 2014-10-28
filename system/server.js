/**
 * Created by Shadow on 28/10/2014.
 */

var vhost = require('../config/vhost.json');
global.$ = require('framework');

/*
    HTTP SERVER
 */
httpServer = function(server){
    var http = require('http');

    http.createServer(function(request, response){
        var host = request.headers.host;
        var app;

        if (typeof server.hosts[host] !== 'undefined'){
            app = require(server.hosts[host].root);
        } else {
            app = require(server.hosts['default'].root);
        }
        app.run(request, response, server.hosts[host]);

        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('Hello World');
    }).listen(server.port);
}

/*
    HTTPS SERVER
 */
httpsServer = function(server){
    var https = require('https');
    var fs = require('fs');

    var options;
    if (typeof server.https.key !== 'undefined') {
        options = {
            key: fs.readFileSync(server.https.key),
            cert: fs.readFileSync(server.https.cert)
        };
    } else {
        options = {
            pfx: fs.readFileSync(server.https.pfx)
        };
    }

    https.createServer(options, function(request, response){
        var host = request.headers.host;

        var app;
        if (typeof server.hosts[host] !== 'undefined'){
            app = require(server.hosts[host].root);
        } else {
            app = require(server.hosts['default'].root);
        }
        app.run(request, response, server.hosts[host]);

        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('Hello World');
    }).listen(server.port);
}

for (var i in  vhost){
    var server = vhost[i];
    var method = server.protocol + 'Server';

    global[method](server);
}