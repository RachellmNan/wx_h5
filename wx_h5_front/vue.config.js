module.exports = {
    devServer: {
        // 项目主机地址
        host: 'm.imooc.com', 
        // 端口号
        port: 8000,
        // 设置代理
        proxy: {
            '/api': {
                //目标api地址
                target: 'http://localhost:3000',
                // 是否需要websockets 
                wx:false,
                // 将主机标头改为目标URL
                //  changeOrign true
                //  /api/test
                // http://localhost:5000/test
                //  changeOrign false
                //  /api/test
                // http://localhost:5000/api/test
                changeOrigin: true,
                // pathRewrite:{
                //     // 服务端收到的url中删除了字符串 ‘/api’，但是请求URL还是有/api
                //     '/api':''
                // }
            }
        },
    },
    lintOnSave: false
}