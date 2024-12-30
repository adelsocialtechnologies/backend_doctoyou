const express= require('express')
const { signup, login  , getAlldoctorUser ,aprovedDoctor} = require('../controllers/doctorLoginSignup')
const router =  express.Router();

router
.post('/doctorsignup', signup)
.post('/doctorlogin', login)
.get('/getdoctorUser', getAlldoctorUser)
.put('/verifieddoctor/:doctorId', aprovedDoctor)

module.exports= router;


