'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Patients, {foreignKey: 'hospitalId'});
    }
  };
  Hospitals.init({
    name: DataTypes.STRING,
    respiratorAmount: {type: DataTypes.INTEGER,
    field: 'respirator_amount'},
    maxCapacity: {type: DataTypes.INTEGER,
    field: 'max_capacity'}
  }, {
    sequelize,
    modelName: 'Hospitals',
  });
  return Hospitals;
};