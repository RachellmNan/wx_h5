let fs = require('fs')
const mongoose = require('mongoose')

// 导入所有的Schema
// const dirs = fs.readdirSync(__dirname+'/Schemas')
// dirs.forEach(file=>{
//     require(`${__dirname}/Schemas/${file}`)
// })
// console.log('dirs: ',dirs)

require('./Schemas/User')

const connect = () => {
    return new Promise((resolve)=>{
        // 连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/wx_h5')
        // 监听数据库被打开
        mongoose.connection.on('open',()=>{
            console.log('连接数据库成功') 
            resolve()
        })
    })
}

module.exports = {
    connect
}