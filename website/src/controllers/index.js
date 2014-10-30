/**
 * Created by Shadow on 28/10/2014.
 */
exports.exec = function(response, content){
    var mustache = $.require('mustache');
    var output = mustache.render(content, {"name":"qkjfhsfkdgd"});

    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(output);
}