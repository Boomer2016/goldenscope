const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const serve = require('koa-static')
const proxy = require('koa-proxy')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const compress = require('koa-compress')
const zlib = require('zlib')
const log = require('./log')

const webConf = eval('require')('../conf/conf')

const staticPath = process.env.NODE_ENV === 'production' ? './web/' : '../dist/web/'

const app = new Koa()

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.resLogger(ctx, ms)
})

const gzips = [
  'application/json',
  'text/html',
  'text/css',
  'application/javascript',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/git',
]

app.use(
  compress({
    filter: contentType => gzips.includes(contentType), // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
    threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
    flush: zlib.Z_SYNC_FLUSH, // zlib是node的压缩模块
  }),
)

// app.use(static('dist', { index: 'index.html', defer: true }));
app.use(conditional())
app.use(etag())

app.use(
  serve(path.join(__dirname, staticPath), {
    maxage: 24 * 60 * 60 * 1000,
  }),
)

app.use(async (ctx, next) => {
  if (/^\/apiserver/.test(ctx.url)) {
    return next()
  }

  if (/^\/apimonitor/.test(ctx.url)) {
    return next()
  }

  // if (/^\/assets/.test(ctx.url)) {
  //   return next();
  // }

  // const fileName = /\.html$/.test(ctx.url)
  ctx.request.header['cache-control'] = 'no-store'
  ctx.etag = Math.random()
  ctx.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, staticPath, 'index.html'))
  return next()
})

app.use(
  proxy({
    host: `http://${webConf.monitorServer}`,
    match: /^\/apimonitor\//,
    map: paths => paths.replace('/apimonitor', ''),
  }),
)

app.use(
  proxy({
    host: `http://${webConf.apiServer}`,
    match: /^\/apiserver\//,
    map: paths => paths.replace('/apiserver', ''),
  }),
)

app.on('error', (err, ctx) => {
  log.errLogger(ctx, err)
  console.error('server error', err, ctx)
})

const server = app.listen(webConf.port, () => {
  console.log(`server starting at port ${webConf.port}`)
  console.log(`api server ${webConf.apiServer}`)
})

server.timeout = 0
server.keepAliveTimeout = 0
