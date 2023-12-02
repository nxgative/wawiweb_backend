const Router = require('koa-router')

const router = new Router()

router.get('feedback.list', '/', async (ctx) => {
  try {
    const feedback = await ctx.orm.Feedback.findAll()
    ctx.body = feedback
    ctx.status = 200
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error obteniendo la lista de feedback.\n ' + error
  }
})

// manual
router.post('feedback.create', '/', async (ctx) => {
  try {
    const feedback = await ctx.orm.Feedback.create(ctx.request.body)
    ctx.body = feedback
    ctx.status = 201
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error con el feedback.\n ' + error
  }
})

// por frontend
router.post('feedback.create', '/sent', async (ctx) => {
  const { id, rating, description } = ctx.request.body
  try {
    const feedback = await ctx.orm.Feedback.create({
      id,
      rating,
      description
    })
    ctx.status = 201
  } catch (error) {
    console.log(error)
    ctx.status = 401
    ctx.body = 'Ha ocurrido un error ingresando el feedback.\n ' + error
  }
})

// Eliminar feedback por id de usuario
router.delete('feedback.delete', '/:id', async (ctx) => {
  try {
    const feedback = await ctx.orm.Feedback.findByPk(ctx.params.id)
    await feedback.destroy()
    ctx.status = 204
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error eliminando el usuario.\n ' + error
  }
})

module.exports = router
