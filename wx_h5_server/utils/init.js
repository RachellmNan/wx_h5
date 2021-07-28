const config = require("../config/config");
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static init(app){
        global.config =  config
        this._loadRoutes(app)
    }

    static _loadRoutes(app){
        function whenLoadModules(module){
            if(module instanceof Router){
                app.use(module.routes())
            }
        }
        // 所需导入路由的路径
        const apiDirectory = process.cwd() + '/app/api/v1'
        requireDirectory(module, apiDirectory, {
            visit:whenLoadModules
        })
    }
}

module.exports = InitManager