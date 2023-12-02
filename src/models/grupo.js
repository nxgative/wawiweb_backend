'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Usuario_Grupo, {
        foreignKey: 'id_grupo'
      })
      this.belongsTo(models.Calendario, {
        foreignKey: 'id_calendario'
      })
    }
  }
  Grupo.init({
    id_calendario: DataTypes.INTEGER,
    n_integrantes: DataTypes.INTEGER,
    max_cap: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grupo'
  })
  return Grupo
}
