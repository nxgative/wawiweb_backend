const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function getJWTScope (token) {
  const secret = process.env.JWT_SECRET
  const payload = jwt.verify(token, secret)
  return payload.scope
}

async function getJWTUserId (token) {
  const secret = process.env.JWT_SECRET
  const payload = jwt.verify(token, secret)

  return payload.sub
}

async function isUser (ctx, next) {
  await next()
  const token = ctx.request.headers.authorization.split(' ')[1]
  const scope = getJWTScope(token)
  ctx.assert(scope.includes('user'), 401, 'Unauthorized: No es usuario')
}

async function isAdmin (ctx, next) {
  await next()
  const token = ctx.request.headers.authorization.split(' ')[1]
  const scope = getJWTScope(token)
  ctx.assert(scope.includes('admin'), 401, 'Unauthorized: No es admin')
}

module.exports = {
  isUser, isAdmin, getJWTUserId
}
