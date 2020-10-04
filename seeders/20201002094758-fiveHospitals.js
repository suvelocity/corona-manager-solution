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
   await queryInterface.bulkInsert('Hospitals', [
    {
      name: 'Tel-Hashomer',
      respirator_amount: 30,
      max_capacity: 100,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Hadasa-Ein-Karem',
      respirator_amount: 20,
      max_capacity: 25,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Wolfson',
      respirator_amount: 12,
      max_capacity: 30,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Ichilov',
      respirator_amount: 20,
      max_capacity: 75,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Kaplan',
      respirator_amount: 10,
      max_capacity: 20,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Soroka',
      respirator_amount: 40,
      max_capacity: 200,
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
