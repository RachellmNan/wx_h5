const Router = require('koa-router')
const axios = require('axios')
const router= new Router({
    prefix:'/api/wechat'
})
const config = require('../../../configs/config.js')
const Auth = require('../../../utils/token')
const Http = require('../../../utils/http')
let redirectUrl


// 用户授权重定向
router.get('/redirect',(ctx)=>{
    console.log('进入redirect')
    redirectUrl = ctx.query.url
    let scope = ctx.query.scope
    let callback = 'http://m.imooc.com/api/wechat/getOpenId'
    const authorizeUrl =  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wx.appId}&redirect_uri=${callback}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    ctx.redirect(authorizeUrl)
}) 

// 根据code获取用户openid
router.get('/getOpenId', async (ctx)=>{
    console.log('openID')
    let code = ctx.query.code
    if(!code){
        ctx.body = Http.handleFail('code为空')
    }else{
            let res = await Auth.getAccessToken(ctx, code)
            ctx.body = {
                openid: res.openid,
                access_token: res.access_token
            }
            ctx.redirect(redirectUrl)
    }
})

module.exports = router 