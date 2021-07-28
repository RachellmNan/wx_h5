const { HttpException } = require("../utils/HttpException")

const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        const isDev = global.config.enviroment == 'dev'
        const isHttpException = error instanceof HttpException
        if(isDev && !isHttpException){
            throw error
        }
        if(isHttpException){
            ctx.body = { 
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,        
            } 
            ctx.status= error.status 
        }else{
            ctx.body = {
                msg: '糟糕出了个问题 O(n_n)O~~',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError