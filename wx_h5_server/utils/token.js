const axios = require('axios')
const expire_time = 1000 * 60 * 60 * 2
const config = require('../configs/config')


async function getAccessToken(ctx, code){
    let token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appId}&secret=${config.wx.appSecret}&code=${code}&grant_type=authorization_code`
    let res = await axios.get(token_url)
    if(res.status == 200){
        _setCookies(ctx, 'openid', res.data.openid)
        _setCookies(ctx, 'access_token', res.data.access_token)
        return {
            access_token: res.data.access_token,
            openid: res.data.openid
        }
    }
}

async function getToken(appid, appsecret){
    return new Promise(async(resolve,reject)=>{
        let res = axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET`)
        
    })
}

function _setCookies(ctx, key, value ,domain = 'm.imooc.com', path = '/', maxAge = expire_time, httpOnly = false){
    ctx.cookies.set(key, value, {
        domain,
        path,
        maxAge,
        httpOnly
    })
}

module.exports = {
    getAccessToken
}