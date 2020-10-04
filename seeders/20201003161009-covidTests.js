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
   await queryInterface.bulkInsert('covid_tests', [
    {
      patient_id: 1,
      is_sick: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 2,
      is_sick: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 3,
      is_sick: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 4,
      is_sick: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 5,
      is_sick: false,
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
