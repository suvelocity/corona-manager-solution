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
   await queryInterface.bulkInsert('symptoms_by_patients', [
    {
      patient_id: 1,
      symptom_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 1,
      symptom_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 1,
      symptom_id: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 2,
      symptom_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 2,
      symptom_id: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 3,
      symptom_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 4,
      symptom_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 4,
      symptom_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 4,
      symptom_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      patient_id: 5,
      symptom_id: 2,
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
