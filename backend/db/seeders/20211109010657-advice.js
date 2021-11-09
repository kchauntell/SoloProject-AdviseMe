'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Advice', [
    {
      id: 1,
      advice: `I can definitely see your viewpoint with this. I have encountered a similar situation myself; however, I took a different approach. I would like to share my advice, along with yours.`,
      private: false,
      userId: 1,
      notesId: 2,
    },
    {
      id: 2,
      advice:`I think you were very homesick. Why did you not visit home more often? Were you too far away, or where your parents pushing you out the nest? I ask because, my transition was a lot smoother, and the only differing factor I see is that I visited home way more often than you. My university was also only 2 hours away from my family.`,
      private: false,
      userId: 2,
      notesId: 4,
    },
  ], {});

  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Advice', null, {});
  }
};
