const express = require("express");
const Sequelize = require("sequelize");
const { Symptoms, Patients, SymptomsByPatients } = require("../../models");
const symptomsByPatientRouter = express.Router();
const Op = Sequelize.Op;

symptomsByPatientRouter.post("/", async (req, res) => {
  try {
    const newSymptom = await SymptomsByPatients.create(req.body);
    res.json(newSymptom);
  } catch (err) {
    res.json({ err });
  }
});

symptomsByPatientRouter.delete("/", async (req, res) => {
  try {
    const deleted = await SymptomsByPatients.destroy({
      where: {
        patientId: req.body.patientId,
        symptomId: req.body.symptomId
      },
    });
    res.json({ deleted: true });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = symptomsByPatientRouter;
