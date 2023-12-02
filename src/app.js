const Koa = require('koa')
const KoaLogger = require('koa-logger')
const { koaBody } = require('koa-body')
const router = require('./routing.js')
const orm = require('./models')
const cors = require('koa-cors2')

// Create a new Koa application instance
const app = new Koa()

// Exponer el orm a la app
app.context.orm = orm

// Middlewares
app.use(cors())
app.use(KoaLogger())
app.use(koaBody())

// Koa Router
app.use(router.routes())

module.exports = app
