/**
 * Created by Shadow on 28/10/2014.
 */
exports.get = function(routes, path){
    var ressource = {};
    var ctx = {
        name: 'error404',
        file: 'error404.html',
        ctrl: 'error404.js',
        type: 'html',
        query: {}
    };

    for (i in routes){
        if (typeof routes[i].format !== 'undefined'){
            var reg = new RegExp(routes[i].format, 'i');
            var regs = path.match(reg);
            if (regs){
                if (typeof routes[i].query !== 'undefined'){
                    var j = 1;
                    for (var k in routes[i].query){
                        ctx.query[k] = regs[j];
                        j++;
                    }
                }
                ctx.name = i;
                ctx.type = routes[i].type;
                ctx.file = $.isset(ctx.query.file) ?
                            routes[i].ressource.replace('[file]', ctx.query.file) : routes[i].ressource;
                ctx.ctrl = $.isset(ctx.query.ctrl) ?
                            routes[i].controller.replace('[ctrl]', ctx.query.ctrl) : routes[i].controller;

                for (var j in routes[i]){
                    if (typeof ctx[j] === 'undefined'){
                        ctx[j] = routes[i][j];
                    }
                }
                break;
            }
        }
        ressource.name = "error404";
        ressource.file = "error404.html";
        ressource.ctrl = "error404.js";
    }
    return ressource;
}