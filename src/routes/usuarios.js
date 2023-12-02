const Router = require('koa-router')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

dotenv.config()

const router = new Router()

// Crear un usuario
router.post('usuario.create', '/', async (ctx) => {
  try {
    const user = await ctx.orm.Usuario.create(ctx.request.body)
    ctx.body = user
    ctx.status = 201
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error creando al usuario.\n ' + error
  }
})

// Registrar un usuario
router.post('usuario.create', '/register', async (ctx) => {
  const { nombre, mail, password } = ctx.request.body
  let user = await ctx.orm.Usuario.findOne({ where: { nombre } })
  if (user) { // si el usuario ya existe
    ctx.status = 400
    ctx.body = 'El nombre de usuario ' + user.nombre + ' ya existe'
    return
  }
  const email = await ctx.orm.Usuario.findOne({ where: { mail } })
  if (email) { // si el mail ya existe
    ctx.status = 400
    ctx.body = 'El mail ' + user.mail + ' ya existe'
    return
  }
  try { // si no existe el usuario ni el mail, se crea el usuario
    const SALT_ROUNDS = 10
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
    user = await ctx.orm.Usuario.create({
      nombre,
      mail,
      password: hashPassword
    })
    ctx.status = 201
  } catch (error) {
    ctx.status = 401
    ctx.body = 'Ha ocurrido un error creando al usuario.\n ' + error
  }
})

// Login de usuario
router.post('usuario.login', '/login', async (ctx) => {
  let user
  const { nombre, password } = ctx.request.body

  try {
    user = await ctx.orm.Usuario.findOne({ where: { nombre } })
  } catch (error) {
    ctx.body = 'Ha ocurrido un error al loggear, verifica que el nombre de usuario exista.\n ' + error
    ctx.status = 400
    return
  }
  if (!user) {
    console.log('El usuario ' + nombre + ' no existe')
    ctx.body = 'El usuario ' + nombre + ' no existe'
    ctx.status = 400
    return
  }

  const validPassword = await bcrypt.compare(password, user.password) // chequeamos la pw
  // console.log(validPassword);
  if (validPassword) { // si la contraseña coincide
    ctx.body = {
      nombre: user.nombre
    }
    // ctx.status = 200;
  } else {
    ctx.status = 400
    ctx.body = 'Contraseña incorrecta'
    return
  }
  try {
    // JWT -> devolvemos token
    const expirationSeconds = process.env.JWT_EXPIRATION_SECONDS
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET
    if (user.nombre === 'ADMIN') {
      const token = jwt.sign(
        { scope: ['admin'] }, // definimos scope
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
        { expiresIn: expirationSeconds }
      )
      ctx.body = {
        access_token: token,
        token_type: 'Bearer',
        expires_in: expirationSeconds
      }
      ctx.status = 200
    } else {
      const token = jwt.sign(
        { scope: ['user'] }, // definimos scope
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
        { expiresIn: expirationSeconds }
      )
      ctx.body = {
        access_token: token,
        token_type: 'Bearer',
        expires_in: expirationSeconds
      }
      ctx.status = 200
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error.\n ' + error
    console.log(error)
  }
})

// Obtener la lista de usuarios
router.get('usuario.list', '/', async (ctx) => {
  try {
    const users = await ctx.orm.Usuario.findAll()
    ctx.body = users
    ctx.status = 200
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error obteniendo la lista de usuarios.\n ' + error
  }
})

// Obtener un usuario por id
router.get('usuario.show', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.Usuario.findByPk(ctx.params.id)
    ctx.body = user
    ctx.status = 200
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error obteniendo la lista de usuarios.\n ' + error
  }
})

// Actualizar un usuario por id
// router.put('usuario.update', '/:id', async (ctx) => {
//   try {
//     const user = await ctx.orm.Usuario.findByPk(ctx.params.id)
//     await user.update(ctx.request.body)
//     ctx.body = user
//     ctx.status = 200
//   } catch (error) { // cualquier otro error
//     ctx.status = 400
//     ctx.body = 'Ha ocurrido un error actualizando el usuario.\n ' + error
//   }
// })

// Eliminar un usuario por id
router.delete('usuario.delete', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.Usuario.findByPk(ctx.params.id)
    await user.destroy()
    ctx.body = 'El usuario ' + user.nombre + ' ha sido eliminado'
    console.log('El usuario ' + user.nombre + ' ha sido eliminado')
    ctx.status = 204
  } catch (error) { // cualquier otro error
    ctx.status = 400
    ctx.body = 'Ha ocurrido un error eliminando el usuario.\n ' + error
  }
})

// Manejo de perfil

router.put('usuario.updateprofile', '/actualizar', async (ctx) => {
  const { userId, newName, newEmail, newPassword, currentPassword } = ctx.request.body
  // console.log(newName, newEmail, newPassword, currentPassword);
  try {
    // Verificar que la contraseña actual coincida
    const user = await ctx.orm.Usuario.findByPk(userId)

    const validPassword = await bcrypt.compare(currentPassword, user.password)
    if (!validPassword) {
      ctx.status = 400
      ctx.body = { message: 'La contraseña actual no es válida.' }
      return
    }

    const nameExists = await ctx.orm.Usuario.findOne({ where: { nombre: newName } })
    const mailExists = await ctx.orm.Usuario.findOne({ where: { mail: newEmail } })

    if (nameExists && nameExists.nombre !== user.nombre) {
      ctx.status = 400
      console.log('El nombre de usuario ' + newName + ' ya existe')
      ctx.body = { message: 'El nombre de usuario ' + newName + ' ya existe' }
      return
    }
    if (mailExists && mailExists.mail !== user.mail) {
      ctx.status = 400
      console.log('El mail ' + newEmail + ' ya existe')
      ctx.body = { message: 'El mail ' + newEmail + ' ya existe' }
      return
    }

    await user.update({
      nombre: newName,
      mail: newEmail
    })

    // Si se proporciona una nueva contraseña, actualizarla
    if (newPassword) {
      const SALT_ROUNDS = 10
      const hashPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)
      await user.update({ password: hashPassword })
    }

    ctx.status = 200
    ctx.body = { message: 'Perfil actualizado con éxito.' }
  } catch (error) {
    ctx.status = 400
    ctx.body = { message: 'Ha ocurrido un error actualizando el perfil.' }
  }
})

module.exports = router
