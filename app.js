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
    var url = require('url');
    var querystring = require('querystring');

    var path = url.parse(request.url).pathname;
    var page = $.require('router').get(routes, path);
    console.log(page);

    reponse.writeHead(200, {'Content-Type':'text/html'});
    response.end('hello world index');
};