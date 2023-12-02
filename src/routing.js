const Router = require('koa-router')
const usuarios = require('./routes/usuarios.js')
const dotenv = require('dotenv')
const jwtMiddleware = require('koa-jwt')
const scopeProtectedRoutes = require('./routes/scopeAuth.js')
const feedback = require('./routes/feedback.js')

dotenv.config()

const router = new Router()

// Desde esta linea se requiere JWT, poner rutas atras si no queremos que requieran JWT
router.use('/usuario', usuarios.routes())
router.use('/feedback', feedback.routes())
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/scope', scopeProtectedRoutes.routes())

module.exports = router
