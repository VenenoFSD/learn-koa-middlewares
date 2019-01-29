// test code

const Voa = require('./voa')
const app = new Voa()
const delay = require('./test')

app.use(async (ctx, next) => {
    ctx.body = '1'
    await next()
    ctx.body += '5'
})
app.use(async (ctx, next) => {
    ctx.body += '2'
    await delay()
    await next()
    ctx.body += '4'
})
app.use(async ctx => {
    ctx.body += '3'
})

app.listen(1201, () => {
    console.log('server start on 1201');
})

/* node demo */
// const http = require('http')
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hello')
// })
//
// server.listen(1201, () => {
//     console.log('server start on 1201')
// })

/* koa demo */
// const Koa = require('koa')
// const app = new Koa()
//
// app.use(async ctx => {
//     ctx.body = 'Hello World'
// })
//
// app.listen(3000)
