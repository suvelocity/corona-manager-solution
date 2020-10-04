const express = require("express");
const Sequelize = require("sequelize");
const { Hospitals, Patients } = require("../../models");
const hospitalsRouter = express.Router();
const Op = Sequelize.Op;

// GET
hospitalsRouter.get("/", async (req, res, next) => {
  try {
    const allHospitals = await Hospitals.findAll({
      include: [{ model: Patients }],
    });
    res.json(allHospitals);
  } catch (err) {
    res.send({ err });
  }
});
hospitalsRouter.get("/respirator_luck", async (req, res, next) => {
  try {
    const allHospitals = await Hospitals.findAll({
      include: [
        {
          model: Patients,
          where: {
            status: 'respiratory'
          }
        },
      ],
      // raw: true,
    });
    const hospitalsInLuck = allHospitals.filter((hospital) =>
     (hospital.respiratorAmount - hospital.Patients.length) < 5
    );

    res.json(hospitalsInLuck);
  } catch (err) {
    res.json({ err });
  }
});

hospitalsRouter.get("/byId/:hospitalId", async (req, res, next) => {
  try {
    const hospital = await Hospitals.findOne({
      include: [{ model: Patients }],
      where: { id: req.params.hospitalId },
    });
    res.json(hospital);
  } catch (err) {
    res.send({ err });
  }
});

// POST
hospitalsRouter.post("/", async (req, res, next) => {
  try {
    const { name, respiratorAmount } = req.body;
    const hospital = await Hospitals.create({
      name,
      respiratorAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(hospital);
  } catch (err) {
    res.send({ err });
  }
});

// PUT
hospitalsRouter.put("/:hospitalId", async (req, res, next) => {
  try {
    const hospital = await Hospitals.findByPk(req.params.hospitalId);
    await hospital.update(req.body);
    res.json(hospital);
  } catch (err) {
    res.send({ err });
  }
});

// DELETE
hospitalsRouter.delete("/:hospitalId", async (req, res, next) => {
  try {
    const hospital = await Hospitals.destroy({
      where: {
        id: res.params.hospitalId,
      },
    });
    res.json({ deleted: true });
  } catch (err) {
    res.send({ err });
  }
});

module.exports = hospitalsRouter;
