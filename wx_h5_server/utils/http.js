const axios =  require('axios')
const { HttpException, ParameterException } = require('./HttpException')

function handleSuccess(data = ''){
    return {
        code: 0,
        data,
        msg: '处理成功'
    }
}
function handleFail(msg = '', code = 1001){
    return {
        code,
        data: null,
        msg
    }
}

// 生成随机字符串
function createNonceStr(){
    return Math.random().toString(36).substring(2,10)
}

// 生成时间戳
function createTimeStamp(){
    return parseInt(new Date().getTime()/1000)
}

// 带签名参数排序
function raw(args){
    let obj = {}
    Object.keys(args).sort().forEach(key=>{
        obj[key] = args[key]
    })
    let result = ''
    for(let i in obj){
        result += '&' + i + '=' + obj[i]
    }
    return result.substring(1)
}

function handleResponse(res){
    if(res.status!=200){
        throw new HttpException()
    }else if(res.data.errcode){
        throw new ParameterException()
    }
}

module.exports = {
    handleSuccess,
    handleFail,
    createNonceStr,
    createTimeStamp,
    handleResponse,
    raw
}