'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuario_Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario'
      })
      this.belongsTo(models.Grupo, {
        foreignKey: 'id_grupo'
      })
    }
  }
  Usuario_Grupo.init({
    id_usuario: DataTypes.INTEGER,
    id_grupo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario_Grupo'
  })
  return Usuario_Grupo
}
