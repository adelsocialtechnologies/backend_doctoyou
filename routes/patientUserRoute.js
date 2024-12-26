const express= require('express')
const { signup, login  , getAllpatientUser} = require('../controllers/patientLoginSignup')
const router =  express.Router();

router
.post('/patientsignup', signup)
.post('/patientlogin', login)
.get('/getpatientUser', getAllpatientUser);


module.exports= router;


