'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.SymptomsByPatients, {foreignKey: 'patientId'});
      this.belongsTo(models.Cities, {foreignKey: 'cityId'});
      this.hasMany(models.CovidTests, {foreignKey: 'patientId'});
    }
  };
  Patients.init({
    name: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
      field: 'date_of_birth'
    },
    cityId: {
      type: DataTypes.INTEGER,
      field: 'city_id'
    },
    status: DataTypes.STRING,
    hospitalId: {
      type :DataTypes.INTEGER,
      field: 'hospital_id',
      defaultValue: "isolation"
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Patients',
  });
  return Patients;
};