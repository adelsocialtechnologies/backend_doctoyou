const express= require('express')
const { signup, login  , getAlladminUser} = require('../controllers/adminLoginSignup')
const router =  express.Router();

router
.post('/adminsignup', signup)
.post('/adminlogin', login)
.get('/getadminUser', getAlladminUser);

module.exports= router;


