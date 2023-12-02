'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Calendario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Evento, {
        foreignKey: 'id_calendario'
      })
      this.hasMany(models.Template, {
        foreignKey: 'id_template'
      })
      this.belongsTo(models.Grupo, {
        foreignKey: 'id_calendario'
      })
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_calendario'
      })
    }
  }
  Calendario.init({
    id_template: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Calendario'
  })
  return Calendario
}
