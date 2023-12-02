module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Feedbacks', [
    {
      id: '1',
      rating: '3', // 123
      description: 'Meh, está decente.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      rating: '5', // 123
      description: 'Me encantó! Ahora puedo organizar mis tiempos de juego con el Luno!',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { ignoreDuplicates: true }),
  down: (queryInterface) => queryInterface.bulkDelete('Feedbacks', null, {})
}
