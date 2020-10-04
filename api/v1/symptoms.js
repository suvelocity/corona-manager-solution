const express = require("express");
const Sequelize = require("sequelize");
const { Symptoms, Patients, SymptomsByPatients } = require("../../models");
const symptomsByPatientMock = require("../../tests/mockData/symptomsByPatientMock");
const symptomsRouter = express.Router();
const Op = Sequelize.Op;

// GET
symptomsRouter.get("/", async (req, res, next) => {
  // try {
  //   const allSymptoms = await Symptoms.findAll({
  //     include: [
  //       {
  //         model: SymptomsByPatients,
  //         include: [
  //           {
  //             model: Patients,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   res.json(allSymptoms);
  // } catch (error) {
  //   res.send({ error });
  // }
  try {
    const allSymptoms = await Symptoms.findAll();
    res.send(allSymptoms)
  } catch (error) {
    res.json(error);
  }
});
symptomsRouter.get("/byId/:symptomId", async (req, res, next) => {
  try {
    const symptom = await Symptoms.findOne({
      include: [
        {
          model: SymptomsByPatients,
          include: [
            {
              model: Patients,
            },
          ],
        },
      ],
      where: { id: req.params.symptomId },
    });
    res.json(symptom);
  } catch (error) {
    res.send({ error });
  }
});

// POST
symptomsRouter.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const symptom = await Symptoms.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(symptom);
  } catch (error) {
    res.send({ error });
  }
});

// PUT
symptomsRouter.put("/:symptomId", async (req, res, next) => {
  try {
    const symptom = await Symptoms.findByPk(req.params.symptomId);
    const result = await symptom.update(req.body);
    res.json(result);
  } catch (error) {
    res.send({ error });
  }
});

// DELETE
symptomsRouter.delete("/:symptomId", async (req, res, next) => {
  try {
    const symptom = await Symptoms.destroy({
      where: {
        id: res.params.symptomId,
      },
    });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = symptomsRouter;
