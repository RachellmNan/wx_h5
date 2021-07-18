const axios =  require('axios')

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

module.exports = {
    handleSuccess,
    handleFail
}