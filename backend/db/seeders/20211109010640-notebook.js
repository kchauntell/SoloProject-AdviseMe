'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notebooks', [
      {
        id: 1,
        title: 'Learn to Actively Listen',
        genre: 'Relationships',
        hidden: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'What will a real friend do?',
        genre: 'Platonic Relationships',
        hidden: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'How to keep your Job!',
        genre: "Work Environment/Relationships",
        hidden: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'How to survive Freshman Year',
        genre: 'School Environment',
        hidden: false,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'How to be Internationally Understood',
        genre: 'School Environment',
        hidden: false,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title: '90 Day trial, try securing within 30 Days',
        genre: 'Work Environment/Relationships',
        hidden: false,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
