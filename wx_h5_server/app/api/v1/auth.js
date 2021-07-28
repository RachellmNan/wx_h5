const Router = require('koa-router')
const axios = require('axios')
const createHash = require('create-hash')
const router= new Router({
    prefix:'/api/wechat'
})
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const config = require('../../../config/config.js')
const Auth = require('../../../utils/token')
const Http = require('../../../utils/http')
const { ParameterException } = require('../../../utils/HttpException.js')
let redirectUrl
let access_token
let openid

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
            Auth.setCookies(ctx, 'openid', res.openid)
            openid = res.openid
            access_token = res.access_token

            let result = await UserModel.findOne({
                openid
            })
            if(!result){
                result = await Auth.getUserinfo(openid, access_token)
                await UserModel.create({
                    openid: result.openid,
                    city: result.city,
                    country: result.country,
                    nickname: result.nickname,
                    province: result.province,
                    sex: result.sex,
                    privilege: result.privilege
                })
            }
            
            ctx.body = {
                openid: res.openid,
                access_token: res.access_token
            }
            ctx.redirect(redirectUrl)
    }
})

router.get('/getUserInfo', async (ctx,next)=>{
    console.log('进入UserInfo')
    let res = await Auth.getUserinfo(openid, access_token)
    ctx.body = res
})

router.get('/jssdk', async (ctx)=>{
    let {url} = ctx.query
    let token = await Auth.getNormalToken()
    let ticket = await Auth.getJsTicket(token)
    ctx.ticket = ticket 
    const params = {
        noncestr: Http.createNonceStr(),
        jsapi_ticket: ticket,
        timestamp: Http.createTimeStamp(),
        url
    }
    let waitingSignature = Http.raw(params)
    let sign
    try {
        sign = createHash('sha1').update(waitingSignature).digest('hex')
    } catch (error) {
        throw new ParameterException()
    }
    console.log('sign: ',sign)
    ctx.body = {
        appId: config.wx.appId, 
        timestamp: params.timestamp, 
        nonceStr: params.noncestr,
        signature: sign,
        jsApiList:[
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'chooseWXPay'
        ]
    }

})

module.exports = router  