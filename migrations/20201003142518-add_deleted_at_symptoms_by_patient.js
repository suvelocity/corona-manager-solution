
module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'symptoms_by_patients',
      'deleted_at',
     Sequelize.DATE
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'symptoms_by_patients',
      'deleted_at'
    );
  }
}