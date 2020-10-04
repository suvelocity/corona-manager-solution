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
   await queryInterface.bulkInsert('Cities', [
    {
      name: 'Tel-Aviv',
      population: 750000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Jerusalem',
      population: 1000000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Eilat',
      population: 80000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Bat-Yam',
      population: 90000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Natanya',
      population: 100000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Rishon LeZion',
      population: 100000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Hadera',
      population: 100000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Gedera',
      population: 100000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Sderot',     
      population: 100000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'NBe\'er Sheva',      
      population: 100000,
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
