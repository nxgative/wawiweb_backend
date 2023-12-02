'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Calendario, {
        foreignKey: 'id_calendario'
      })
    }
  }
  Evento.init({
    id_calendario: DataTypes.INTEGER,
    color: DataTypes.STRING,
    titulo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento'
  })
  return Evento
}
