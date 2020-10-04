const request = require("supertest");
const app = require("../app");

//model for bulkCreate
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const {
  Patients,
  CovidTests,
  Symptoms,
  SymptomsByPatients,
  Cities,
  Hospitals
} = require("../models");

//mock data
const patientsMock = require('./mockData/patientMock')
const covidTestMock = require('./mockData/covidTestMock')
const citiesMock = require('./mockData/citiesMock')
const symptomMock = require('./mockData/symptomsMock')
const SymptomsByPatientsMock = require('./mockData/symptomsByPatientMock')
const hospitalsMock = require("./mockData/hospitalsMock");
const singlePatientMock = {
    name: "patient6",
    dateOfBitrth: new Date(1980, 1, 30),
    cityId: 2,
    status: "isolation",
    hospitalId: 2,
  }

describe("Patient api tests", () => {

  beforeAll(async () => {
    await Patients.destroy({ truncate: true, force: true });
    await CovidTests.destroy({ truncate: true, force: true });
    await Symptoms.destroy({ truncate: true, force: true });
    await SymptomsByPatients.destroy({ truncate: true, force: true });
    await Cities.destroy({ truncate: true, force: true });
  });

  afterAll(async () => {
   app.close()
  })

  it("Can add new patients, cities, symptoms and covid tests", async () => {
    
    const patientsResult = await Patients.bulkCreate(patientsMock)
    expect(patientsResult.length).toBe(5)

    const covidTestResult = await CovidTests.bulkCreate(covidTestMock)
    expect(covidTestResult.length).toBe(5)

    const citiesResult = await Cities.bulkCreate(citiesMock)
    expect(citiesResult.length).toBe(2)

    const symptomsResult = await Symptoms.bulkCreate(symptomMock)
    expect(symptomsResult.length).toBe(3)
    
    const symptomsByPatientsResult = await SymptomsByPatients.bulkCreate(SymptomsByPatientsMock)
    expect(symptomsByPatientsResult.length).toBe(5)
    
    const hospitalsResult = await Hospitals.bulkCreate(hospitalsMock)
    expect(hospitalsResult.length).toBe(2)
  
  });

  it("Can get all the Patients with their cities name, test results, and symptoms", async () => {
    const { body } = await request(app).get("/api/v1/patients").expect(200);
    expect(body.length).toBe(5);
    expect(body[0].name).toBe(patientsMock[0].name)
    expect(body[1].SymptomsByPatients[0].Symptom.name).toBe(symptomMock[0].name)
    expect(body[2].City.name).toBe(citiesMock[0].name)
    expect(body[3].CovidTests[0].isSick).toBe(false)
  });

    it('Can get all patients with covid Tests that are positive', async () => {
      const { body } = await request(app).get('/api/v1/patients/positive');
      expect(body.length).toBe(3);
    });

  it("Can get patient by id with his city, test result and symptoms", async () => {
    const { body } = await request(app).get("/api/v1/patients/byId/2").expect(200);
    expect(body.City.name).toBe(citiesMock[0].name);
    expect(body.CovidTests[0].isSick).toBe(false);
    expect(body.SymptomsByPatients[0].Symptom.name).toBe(symptomMock[0].name);
  });

  it("Can get patient by name with his city, test result and symptoms", async () => {
    const { body } = await request(app).get("/api/v1/patients/byName/patient1").expect(200);
    console.log(body);
    expect(body.City.name).toBe(citiesMock[1].name);
    expect(body.CovidTests[0].isSick).toBe(true);
    expect(body.SymptomsByPatients[0].Symptom.name).toBe(symptomMock[0].name);
  });
  
  
  it("POST a new patient with new CovidTests and thier new symptom", async () => {
    const { body } = await request(app).post("/api/v1/patients").send(singlePatientMock).expect(200);
    expect(body.id).toBe(body.CovidTests[0].patientId)
    expect(body.CovidTests[0].isSick).toBe(null)
  })
  
  it("Can delete a patient by id", async () => {
    await request(app).delete("/api/v1/patients/1");
    const { body } = await request(app).get("/api/v1/patients");
    expect(body.length).toBe(5);
  });
});
