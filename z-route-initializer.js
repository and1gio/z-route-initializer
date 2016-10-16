'use strict';

module.exports = {
    run: function (app, next) {
        var beforeRoute = app.config.zMiddleware.beforeRoute;
        for (var i in beforeRoute.middleware) {
            require(app.folderPath.app.root + beforeRoute.rootDir + '/' + beforeRoute.middleware[i])(app);
        }

        for (var i in app.config.zRoute) {
            var module = require(app.folderPath.route + app.config.zRoute[i]);
            app.express.use(i, module(app));
        }

        var afterRoute = app.config.zMiddleware.afterRoute;
        for (var i in afterRoute.middleware) {
            require(app.folderPath.app.root + afterRoute.rootDir + '/' + afterRoute.middleware[i])(app);
        }
        next();
    }
};
