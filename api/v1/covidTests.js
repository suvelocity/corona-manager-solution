const express = require("express");
const Sequelize = require("sequelize");
const { CovidTests, Patients, Cities } = require("../../models");
const covidTestsRouter = express.Router();
const Op = Sequelize.Op;

// GET
covidTestsRouter.get("/", async (req, res, next) => {
  try {
    const allCovidTests = await CovidTests.findAll({
      include: [{ model: Patients }],
    });
    res.json(allCovidTests);
  } catch (error) {
    res.json(error);
  }
});


covidTestsRouter.get("/test-results/:testResult", async (req, res) => {
  try {
       countTests = await CovidTests.findAll({
        attributes:[[Sequelize.fn("COUNT", Sequelize.col("is_sick")), 'count']],
        where: {isSick: {[Op.eq]: req.params.testResult}} 
  })
    res.json(countTests[0]);
  } catch (error) {
    res.json(error)
  }
})
covidTestsRouter.get("/:patientId", async (req, res, next) => {
  try {
    const covidTests = await CovidTests.findOne({
      include: [{ model: Patients }],
      where: { patientId: req.params.patientId },
    });
    res.json(covidTests);
  } catch (error) {
    res.json(error);
  }
});


// POST
covidTestsRouter.post("/", async (req, res, next) => {
  try {
    const { patientId, isSick } = req.body;
    const covidTest = await Cities.create({
      patientId,
      isSick,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(covidTest);
  } catch (error) {
    res.json(error);
  }
});

// PUT
covidTestsRouter.put("/:testId", async (req, res, next) => {
  try {
    const result = await CovidTests.update({
      isSick: req.body.isSick},
      {where: {
        id: req.params.testId
      }}
    );
    res.json({updated: true});
  } catch (error) {
    res.json(error);
  }
});

// DELETE
covidTestsRouter.delete("/:covidTestId", async (req, res, next) => {
  try {
    const covidTest = await CovidTests.findByPk(req.params.covidTestId);
    await covidTest.destroy();
    res.json({ deleted: true });
  } catch (err) {
    res.json(err);
  }
});

module.exports = covidTestsRouter;
