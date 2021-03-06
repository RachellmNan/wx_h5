class HttpException extends Error{
    constructor(msg = '服务器异常', errorCode = 10000, status = 400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = status
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.status = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10010
    }
}

module.exports = {
    HttpException,
    ParameterException
}