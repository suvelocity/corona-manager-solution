const request = require("supertest");
const app = require("../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const {
  Patients,
  CovidTests,
  Symptoms,
  SymptomsByPatients,
  Cities,
  Hospitals,
} = require("../models");

//mock data
const patientsMock = require("./mockData/patientMock");
const covidTestMock = require("./mockData/covidTestMock");
const citiesMock = require("./mockData/citiesMock");
const symptomMock = require("./mockData/symptomsMock");
const SymptomsByPatientsMock = require("./mockData/symptomsByPatientMock");
const hospitalsMock = require("./mockData/hospitalsMock");
const newSymptomMock = {
  patientId: 1,
  symptomId: 2,
};

describe("Symptoms api tests", () => {
  beforeAll(async () => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    await Patients.destroy({ truncate: true, force: true });
    await CovidTests.destroy({ truncate: true, force: true });
    await Symptoms.destroy({ truncate: true, force: true });
    await SymptomsByPatients.destroy({ truncate: true, force: true });
    await Cities.destroy({ truncate: true, force: true });
    
    const patientsResult = await Patients.bulkCreate(patientsMock);
    expect(patientsResult.length).toBe(5);
  
    const covidTestResult = await CovidTests.bulkCreate(covidTestMock);
    expect(covidTestResult.length).toBe(5);
  
    const citiesResult = await Cities.bulkCreate(citiesMock);
    expect(citiesResult.length).toBe(2);
  
    const symptomsResult = await Symptoms.bulkCreate(symptomMock);
    expect(symptomsResult.length).toBe(3);
  
    const symptomsByPatientsResult = await SymptomsByPatients.bulkCreate(
      SymptomsByPatientsMock
    );
    expect(symptomsByPatientsResult.length).toBe(5);
  
    const hospitalsResult = await Hospitals.bulkCreate(hospitalsMock);
    expect(hospitalsResult.length).toBe(2);
  });

  afterAll(async () => {
    app.close();
  });

  it("get all symptoms", async () => {
    const { body: symptoms } = await request(app)
      .get("/api/v1/symptoms")
      .expect(200);
    expect(symptoms.length).toBe(3);
    expect(symptoms[0].name).toBe(symptomMock[0].name);
    expect(symptoms[1].name).toBe(symptomMock[1].name);
    expect(symptoms[2].name).toBe(symptomMock[2].name);
  });

  it("get symptom by id.", async () => {
    const { body: symptom } = await request(app)
      .get("/api/v1/symptoms/byId/1")
      .expect(200);
    expect(symptom.name).toBe(symptomMock[0].name);
  });

  it("create new symptom for patient", async () => {
    await request(app)
      .post("/api/v1/symptomsByPatient")
      .send(newSymptomMock)
      .expect(200);
    const { body } = await request(app)
      .get("/api/v1/patients/byId/1")
      .expect(200);
    expect(body.SymptomsByPatients[1].Symptom.name).toBe(symptomMock[1].name);
  });

  it("can delete certain symptom for patient", async () => {
    await request(app)
      .delete("/api/v1/symptomsByPatient")
      .send(newSymptomMock)
      .expect(200);
    const { body } = await request(app)
      .get("/api/v1/patients/byId/1")
      .expect(200);
    expect(body.SymptomsByPatients.length).toBe(1);
  });
});
