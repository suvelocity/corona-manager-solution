const express = require("express");
const Sequelize = require("sequelize");
const {
  Patients,
  SymptomsByPatients,
  Cities,
  CovidTests,
  Symptoms,
} = require("../../models");
const patientRouter = express.Router();
const Op = Sequelize.Op;

patientRouter.get("/", async (req, res, next) => {
  try {
    const allPatients = await Patients.findAll({
      include: [
        {
          model: SymptomsByPatients,
          include: [{ model: Symptoms, attributes: ["name"] }],
          attributes: ["id"],
        },
        {
          model: Cities,
          attributes: ["name", "population"],
        },
        {
          model: CovidTests,
        },
      ],
    });
    res.json(allPatients);
  } catch (error) {
    res.send(error);
  }
});

patientRouter.get("/positive", async (req, res, next) => {
  try {
    const positivePatients = await Patients.findAll({
      include: [
        {
          model: CovidTests,
          where: {
            isSick: true,
          },
        },
      ],
    });
    res.json(positivePatients);
  } catch (error) {
    console.log(error);
  }
});

patientRouter.get("/byId/:patientId", async (req, res, next) => {
  try {
    const patient = await Patients.findOne({
      where: { id: req.params.patientId },
      include: [
        {
          model: SymptomsByPatients,
          // attributes: ["id"],
          include: [{ model: Symptoms, attributes: ["name"] }],
        },
        {
          model: Cities,
          attributes: ["name", "population"],
        },
        {
          model: CovidTests,
        },
      ],
    });
    res.json(patient);
  } catch (error) {
    res.send({ error });
  }
});


patientRouter.get("/byName/:patientName", async (req, res, next) => {
  try {
    const patient = await Patients.findOne({
      where: { 'name': {[Op.like]: `%${req.params.patientName}%`} },
      include: [
        {
          model: SymptomsByPatients,
          include: [{ model: Symptoms, attributes: ["name"] }],
        },
        {
          model: Cities,
          attributes: ["name", "population"],
        },
        {
          model: CovidTests,
        },
      ],
    });
    res.json(patient);
  } catch (error) {
    res.send({ error });
  }
});

patientRouter.post("/", async (req, res, next) => {
  try {
    const { name, dateOfBirth, cityId, status, hospitalId } = req.body;
    const patient = await Patients.create({
      name,
      dateOfBirth,
      cityId,
      status,
      hospitalId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const patientId = patient.id
    const covidTest = await CovidTests.create({
      patientId: patientId
    })
    const patientWithTest = await Patients.findOne({
      where: { id: patientId },
      include: [
        {
          model: CovidTests,
        },
      ],
    });
    res.json(patientWithTest)
  } catch (error) {
    res.send({ error });
  }
});

patientRouter.put("/:patientId", async (req, res, next) => {
  try {
    const patient = await Patients.findByPk(req.params.patientId);
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.send({ error });
  }
});

patientRouter.delete("/:patientId", async (req, res, next) => {
  try {
    const patient = await Patients.findByPk(req.params.patientId);
    await patient.destroy();
    res.json({ deleted: true });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = patientRouter;
