'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Calendario, {
        foreignKey: 'id_template'
      })
    }
  }
  Template.init({
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Template'
  })
  return Template
}
