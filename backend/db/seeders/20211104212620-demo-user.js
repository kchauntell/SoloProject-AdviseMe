'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemUs',
        hashedPassword: bcrypt.hashSync('passwordDemo'),
      },
      {
        email: 'kendraChauntello@user.io',
        username: 'kchauntell',
        hashedPassword: bcrypt.hashSync('kchauntell'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemUs', 'FakeUser1', 'FakeUser2', 'kchauntell', 'FakeUser3'] }
    }, {});
  }
};
