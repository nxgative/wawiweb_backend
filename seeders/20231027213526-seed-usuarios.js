module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Usuarios', [
    {
      id: '0',
      nombre: 'ADMIN',
      password: '$2b$10$4Dlh3IpQCNOn5V1uXqf2QuM5lxTP7KwuYolixSlPUVb0uoJXMNjsO', // ADM1N!
      mail: 'admin@gmail.com',
      is_admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '1',
      nombre: 'nicoprueba',
      password: '$2b$10$dpYz87xNbdbQnGI1X0uYF.iuYqeWM6gEbPkujqHQsiWYrk1xkmOSS', // 123
      mail: 'nicoprueba@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      nombre: 'Kimichurri',
      password: '$2b$10$dpYz87xNbdbQnGI1X0uYF.iuYqeWM6gEbPkujqHQsiWYrk1xkmOSS', // 123
      mail: 'kimichurri@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { ignoreDuplicates: true }),
  down: (queryInterface) => queryInterface.bulkDelete('Usuarios', null, {})
}
