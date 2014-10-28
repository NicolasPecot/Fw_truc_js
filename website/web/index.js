/**
 * Created by Shadow on 28/10/2014.
 */
var app = require('./app.js');

exports.run = function(request, response, server){
    app.start(request, response, server);
};