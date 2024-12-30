const express= require('express')
const { signup, login  , getAllpatientUser, getPatientUserbyId} = require('../controllers/patientLoginSignup')
const router =  express.Router();

router
.post('/patientsignup', signup)
.post('/patientlogin', login)
.get('/getpatientUser', getAllpatientUser)
.get('/getpatientUser/:patientId', getPatientUserbyId)



module.exports= router;


