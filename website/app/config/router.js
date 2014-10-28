/**
 * Created by Shadow on 28/10/2014.
 */
exports.get = function(routes, path){
    var ressource = {};

    for (i in routes){
        if (typeof routes[i].format !== 'undefined'){
            var reg = new RegExp(routes[i].format, 'i');
            var regs = path.match(reg);
            if (regs){
                ressource.name = i;
                ressource.file = routes[i].ressource;
                ressource.ctrl = routes[i].controller;
                break;
            }
        }
        ressource.name = "error404";
        ressource.file = "error404.html";
        ressource.ctrl = "error404.js";
    }
    return ressource;
}