const { Router } = require('express');
const index = Router();

index.use('/patients', require('./patients'));

index.use('/hospitals', require('./hospitals'));

index.use('/cities', require('./cities'));

index.use('/covidtests', require('./covidTests'));

index.use('/symptoms', require('./symptoms'));

index.use('/symptomsByPatient', require('./symptomsByPatient'));

module.exports = index;
