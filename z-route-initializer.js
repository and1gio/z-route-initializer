'use strict';

module.exports = {
    run: (app, next) => {
        if (app.config.zMiddleware && app.config.zMiddleware.beforeRoute) {
            const beforeRoute = app.config.zMiddleware.beforeRoute;
            for (let middleware of beforeRoute.middleware) {
                require(app.folderPath.app.root + beforeRoute.rootDir + '/' + middleware)(app);
            }
        }

        const routes = app.config.zRoute.routes;
        for (let i in routes) {
            var module = require(app.folderPath.app.root + app.config.zRoute.rootDir + '/' + routes[i]);
            app.express.use(i, module(app));
        }

        if (app.config.zMiddleware && app.config.zMiddleware.afterRoute) {
            const afterRoute = app.config.zMiddleware.afterRoute;
            for (let middleware of afterRoute.middleware) {
                require(app.folderPath.app.root + afterRoute.rootDir + '/' + middleware)(app);
            }
        }

        next();
    }
};
