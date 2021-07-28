const mongoose = require('mongoose')

const UserSchama = new mongoose.Schema({
    openid:String,
    city: String,
    country: String,
    nickname: String,
    province: String,
    sex:Number,
    privilege: Array
})

mongoose.model('User',UserSchama)
console.log('进入了UserSchema')