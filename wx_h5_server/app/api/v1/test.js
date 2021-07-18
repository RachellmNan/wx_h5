const Router = require('koa-router')
const axios = require('axios')
const router = new Router({
    prefix:'/api/gg'
})

router.get('/a',async(ctx)=>{
    console.log('aaaa')

    // try {
    //     await axios.get('/gg/b')
    // } catch (error) {
    //     console.log('error: ',error.message)
    // }
    // ctx.body = {
    //     code:1
    // }

    // router.redirect('b')
    ctx.redirect('/api/gg/b')
})
router.get('/b',(ctx)=>{
    console.log('进入了b')
    ctx.body = {
        code:10000
    }
})

router.get('/c',(ctx)=>{
    ctx.body = {
        code : 'success'
    }
})
module.exports = router