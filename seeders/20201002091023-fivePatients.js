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
  // ('respiratory', 'recovered', 'dead', 'isolation')

    await queryInterface.bulkInsert('Patients', [
      {
        name: 'Dekel Vaknin',
        date_of_birth: new Date(2001, 4, 5),
        city_id: 2,
        status: 'isolation',
        hospital_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Yakov Levi',
        date_of_birth: new Date(1991, 11, 19),
        city_id: 1,
        status: 'dead',
        hospital_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Ido Shamir',
        date_of_birth: new Date(1987, 2, 22),
        city_id: 4,
        status: 'respiratory',
        hospital_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Haim Yosef',
        date_of_birth: new Date(1953, 5, 15),
        city_id: 3,
        status: 'respiratory',
        hospital_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Naama Sharon',
        date_of_birth: new Date(1989, 1, 30),
        city_id: 2,
        status: 'isolation',
        hospital_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
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
    await queryInterface.bulkDelete('Patients', null, {});
  }
};
