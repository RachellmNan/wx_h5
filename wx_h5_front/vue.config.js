module.exports = {
    devServer: {
        // 主机地址
        host: 'm.imooc.com',
        // 端口号
        port: 4000,
        // 设置代理
        proxy: {
            '/api': {
                //目标api地址
                target: 'http://localhost:5000',
                // 是否需要websockets 
                wx:false,
                // 将主机标头改为目标URL
                //  changeOrign true
                //  /api/test
                // http://localhost:5000/test
                //  changeOrign false
                //  /api/test
                // http://localhost:5000/api/test
                changeOrigin: false,
            }
        }
    }
}