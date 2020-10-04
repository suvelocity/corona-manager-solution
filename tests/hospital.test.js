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

describe("Hospital api tests", () => {
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

  it("GET all hospitals with their capacity (maxCapacity), number of respirator (respiratorAmount)", async () => {
    const { body } = await request(app).get("/api/v1/hospitals").expect(200);

    expect(body.length).toBe(2);
    expect(body[0].name).toBe(hospitalsMock[0].name);
    expect(body[1].maxCapacity).toBe(15);
    expect(body[1].respiratorAmount).toBe(5);
  });

  it("GET Hospital by id", async () => {
    const { body } = await request(app).get("/api/v1/hospitals/byId/1").expect(200);
    expect(body.name).toBe(hospitalsMock[0].name);
  });

  it("GET all the hospitals that need to bring more respirator machines (less than five machines that are available in the hospital)", async () => {
    const { body } = await request(app).get("/api/v1/hospitals/respirator_luck").expect(200);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe(hospitalsMock[1].name);
  });
});

