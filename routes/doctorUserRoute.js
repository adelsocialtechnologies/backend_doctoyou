const express= require('express')
const { signup, login  , getAlldoctorUser} = require('../controllers/doctorLoginSignup')
const router =  express.Router();

router
.post('/doctorsignup', signup)
.post('/doctorlogin', login)
.get('/getdoctorUser', getAlldoctorUser);

module.exports= router;


