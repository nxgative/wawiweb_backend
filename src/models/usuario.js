'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Usuario_Grupo, {
        foreignKey: 'id_usuario'
      })
      this.hasOne(models.Calendario, {
        foreignKey: 'id_calendario'
      })
      this.hasOne(models.Feedback, {
        foreignKey: 'id'
      })
    }
  }
  Usuario.init({
    id_calendario: DataTypes.INTEGER,
    nombre: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: { msg: 'El nombre de usuario solo puede contener letras y números' }
      }
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Mail debe tener un formato tipo email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword (value) {
          if (value.length < 4 || !value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)) {
            throw new Error('La contraseña debe tener al menos 4 caracteres compuestos por al menos una letra, un número y un caracter especial')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario'
  })
  return Usuario
}
