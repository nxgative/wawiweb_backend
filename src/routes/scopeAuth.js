const Router = require('koa-router')
const authUtils = require('../lib/auth/jwt.js')

const router = new Router()

router.get('/protecteduser', authUtils.isUser, async (ctx) => {
  ctx.body = {
    message: 'Identificador: usuario.', user: ctx.state.user
  }
})

router.get('/protectedadmin', authUtils.isAdmin, async (ctx) => {
  ctx.body = {
    message: 'Identificador: admin.', user: ctx.state.user
  }
})

module.exports = router
