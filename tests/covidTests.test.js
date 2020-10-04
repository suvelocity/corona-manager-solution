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
const testUpdate = {
  isSick: false
}




describe("Covid test api tests", () => {
  beforeAll(async () => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    await Patients.destroy({ truncate: true, force: true });
    await CovidTests.destroy({ truncate: true, force: true });
    await Symptoms.destroy({ truncate: true, force: true });
    await SymptomsByPatients.destroy({ truncate: true, force: true });
    await Cities.destroy({ truncate: true, force: true });
    await Hospitals.destroy({ truncate: true, force: true }); 
    
    const patientsResult = await Patients.bulkCreate(patientsMock);
    expect(patientsResult.length).toBe(5);
  
    const covidTestResult = await CovidTests.bulkCreate(covidTestMock);
    expect(covidTestResult.length).toBe(5);
  
    const citiesResult = await Cities.bulkCreate(citiesMock);
    expect(citiesResult.length).toBe(2);
  
    const symptomsResult = await Symptoms.bulkCreate(symptomMock);
    expect(symptomsResult.length).toBe(3);
  
    const symptomsByPatientsResult = await SymptomsByPatients.bulkCreate(SymptomsByPatientsMock);
    expect(symptomsByPatientsResult.length).toBe(5);
  
    const hospitalsResult = await Hospitals.bulkCreate(hospitalsMock);
    expect(hospitalsResult.length).toBe(2);
  });
  
  afterAll(async () => {
    app.close();
  });

it("Count all the covid tests by results", async () => {
const { body : positiveTests} = await request(app).get("/api/v1/covidtests/test-results/1").expect(200);
expect(positiveTests.count).toBe(3);
const { body : negativeTests}  = await request(app).get("/api/v1/covidtests/test-results/0").expect(200);
expect(negativeTests.count).toBe(2);
});

it("Can get all the tests by patient id", async () => {
  const { body } = await request(app).get("/api/v1/covidtests/1").expect(200);
  expect(body.id).toBe(1);
  expect(body.isSick).toBe(true);
});

it("can update the covid test result by test id", async () => {
  const { body : updated} = await request(app).put("/api/v1/covidtests/1").send(testUpdate).expect(200);
  const { body } = await request(app).get("/api/v1/covidtests/1")
  expect(body.isSick).toBe(testUpdate.isSick)
})

it("Can delete a covid test by test id", async () => {
  await request(app).delete("/api/v1/covidtests/1").expect(200);
  const { body } = await request(app).get("/api/v1/covidtests");
  expect(body.length).toBe(4);
});
});