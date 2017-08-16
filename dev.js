var koa = require('koa')

var router = require('koa-router')();
var jade = require('koa-jade')
var staticCache = require('koa-static-cache')

var cors = require('kcors');
var favicon = require('koa-favicon')
var path = require('path')

var app = koa()
app.use(cors());

var koaBody = require('koa-body')();
app.env = 'production'
app.title = 'Morgondag'
app.use(favicon(__dirname + '/public/favicon.ico'))


app.use(jade.middleware({
  viewPath: __dirname + '/views',
  debug: false,
  pretty: false,
  noCache: false,
  cache: true,
  compileDebug: false
}))

var files = {}
app.use(staticCache('/public/js', {}, files))
staticCache('/public/css', {}, files)
staticCache('/public/img', {}, files)
staticCache('/public/fonts', {}, files)
staticCache('/public/m', {}, files)
staticCache('/public/assets', {}, files)

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: (365 * 24 * 60 * 60),
  buffer: false,
  gzip: true,
  dynamic:true
}, files))

var posts = [{
  slug: 'hello',
  title: 'awesome title',
  date: '2015-06-05',
  content: 'lorem ippppsum rweirpow pwerwe iprepri rpweirpwei roiewpripw eirpwierp ewireopriw epripwir pweirpoi woprpoweir opwipriw poriwperi pweiropwr iwrpweirpowi poriwpeirp ow.'
}, {
  slug: 'hello',
  title: 'Steam summersale 2016 hyper delux!',
  date: '2015-06-05',
  content: 'lorem ippppsum rweirpow pwerwe iprepri rpweirpwei roiewpripw eirpwierp ewireopriw epripwir pweirpoi woprpoweir opwipriw poriwperi pweiropwr iwrpweirpowi poriwpeirp ow.'
}]

router.get('/', function*(next) {
  this.render('index', {
    posts: posts
  }, true)
});

app.use(router.routes())
app.server = app.listen(8080)

console.log('http://localhost:8080')
