const axios = require('axios')
// 过期时间为 2h
const expire_time = 1000 * 60 * 60 * 2
const config = require('../config/config')
const { handleResponse } = require('./http')
const { ParameterException } = require('./HttpException')


async function getAccessToken(ctx, code){
    let token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appId}&secret=${config.wx.appSecret}&code=${code}&grant_type=authorization_code`
    let res = await axios.get(token_url)
    ctx.openid = res.data.openid
    ctx.access_token = res.data.access_token
    await handleResponse(res)
    return {
        access_token: res.data.access_token,
        openid: res.data.openid
    }
}

async function getNormalToken(){
    let res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wx.appId}&secret=${config.wx.appSecret}`)
    await handleResponse(res)
    return res.data.access_token
        
}

async function getJsTicket(ACCESS_TOKEN){
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
    let res = await axios.get(url)
    await handleResponse(res)
    return res.data.ticket
}

function setCookies(ctx, key, value ,domain = 'm.imooc.com', path = '/', maxAge = expire_time, httpOnly = false){
    ctx.cookies.set(key, value, {
        domain,
        path,
        maxAge,
        httpOnly
    })
}

async function getUserinfo(openId, accessToken){
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`
    let res = await axios.get(url)
    await handleResponse(res)
    return res.data
}

module.exports = {
    getAccessToken,
    setCookies,
    getNormalToken,
    getUserinfo,
    getJsTicket
}