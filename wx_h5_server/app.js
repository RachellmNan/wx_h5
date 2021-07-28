const Koa = require('koa')
const KoaBody = require('koa-body')
const cors = require('@koa/cors')
const catchError = require('./middlewares/exception')
const InitManager = require('./utils/init')
const { connect } = require('./db')
const app = new Koa()


connect().then(()=>{
    InitManager.init(app)
    app.use(catchError)
    app.use(cors())
    app.use(KoaBody())
    app.listen(3000)
})