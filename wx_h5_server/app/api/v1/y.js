const Router = require('koa-router')
const router = new Router()

router.get('/gg/c',(ctx)=>{
    ctx.body = {
        mes: '没有/api前缀'
    }
})

module.exports = router