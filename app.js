/**
 * Created by Shadow on 28/10/2014.
 */

$.define("ROOT", __dirname + '/..', exports);

var paths = {
    html:       this.ROOT + '/web/html',
    images:     this.ROOT + '/web/images',
    css:        this.ROOT + '/web/css',
    config:     this.ROOT + '/app/config',
    language:   this.ROOT + '/app/language',
    logs:       this.ROOT + '/app/logs',
    controllers:this.ROOT + '/src/controllers',
    models:     this.ROOT + '/src/models'
};

var routes = require(paths.config + 'routes.json');

exports.start = function(request, response, next){
    var fs = require('fs');
    var url = require('url');
    var querystring = require('querystring');

    var path = url.parse(request.url).pathname;
    var page = $.require('router').get(routes, path);

    var content;

    if (typeof page.ctrl !== 'undefined'){
        var controller = require(paths.controllers + "/" + page.file);
    }

    var display = function(content){
        reponse.writeHead(200, {'Content-Type':'text/html'});
        response.end(content);
    };

    if (typeof file[page.type][page.name] !== 'undefined'){
        content = file.html[page.name];
    } else {
        fs.exists(paths.html+'/'+page.file, function(exists){
            if (exists){
                fs.readFile(paths.html+'/'+page.file, 'utf8', function(err, data){
                    if (err) throw err;
                    content = data;
                    display(content);
                });
            }
        });
    }
};

exports.load = function(){
    console.log("loading resources...");

    var loadFile = function(name, path, type){
        var option = (type !== 'image') ? 'utf8' : null;
        fs.exists(path, function(exists) {
            if (exists) {
                fs.readFile(path, option, function (err, data) {
                    if (err) throw err;
                    file[type][name] = data;
                });
            }
        });
    }
    console.log('resources loaded');
    return this;
};