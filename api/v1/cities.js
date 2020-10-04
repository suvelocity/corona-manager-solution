const express = require("express");
const Sequelize = require("sequelize");
const { Cities, Patients } = require("../../models");
const citiesRouter = express.Router();
const Op = Sequelize.Op;

// GET
citiesRouter.get("/", async (req, res, next) => {
  try {
    const allCities = await Cities.findAll({
      include: [{ model: Patients }],
    });
    res.json(allCities);
  } catch (err) {
    res.json(err);
  }
});
citiesRouter.get("/mostsick", async (req, res, next) => {
  try {
    const allCities = await Cities.findAll({
      include: [{ model: Patients }],
    });
    let mostSickCity = [allCities[0]];
    for (let i = 0; i < allCities.length; i++) {
      if (mostSickCity[0].Patients.length < allCities[i].Patients.length) {
        mostSickCity = [allCities[i]];
      }

      else if (mostSickCity[0].Patients.length < allCities[i].Patients.length) {
        mostSickCity.push(allCities[i]);
      }
    }
    res.json(mostSickCity);
  } catch (err) {
    res.json(err);
  }
});

citiesRouter.get("/byId/:cityId", async (req, res, next) => {
  try {
    const city = await Cities.findOne({
      include: [{ model: Patients }],
      where: { id: req.params.cityId },
    });
    res.json(city);
  } catch (err) {
    res.json(err);
  }
});

// POST
citiesRouter.post("/", async (req, res, next) => {
  try {
    const { name, population } = req.body;
    const city = await Cities.create({
      name,
      population,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(city);
  } catch (err) {
    res.json(err);
  }
});

// PUT
citiesRouter.put("/:cityId", async (req, res, next) => {
  try {
    const city = await Cities.findByPk(req.params.cityId);
    await city.update(req.body);
    res.json(city);
  } catch (err) {
    res.json(err);
  }
});

// DELETE
citiesRouter.delete("/:cityId", async (req, res, next) => {
  try {
    const city = await Cities.findByPk(req.params.cityId);
    await city.destroy();
    res.json({ deleted: true });
  } catch (err) {
    res.json(err);
  }
});

module.exports = citiesRouter;




