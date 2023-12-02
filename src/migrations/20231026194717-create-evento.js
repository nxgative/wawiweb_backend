'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_calendario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Calendarios',
          key: 'id'
        }
      },
      color: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      descripcion: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Eventos')
  }
}
