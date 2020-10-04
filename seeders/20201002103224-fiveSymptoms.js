'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Symptoms', [
    {
      name: 'Difficulty Breathing',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Dizziness',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Headache',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Chest Pain',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Trouble Sleeping',
      created_at: new Date(),
      updated_at: new Date(),
    }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
