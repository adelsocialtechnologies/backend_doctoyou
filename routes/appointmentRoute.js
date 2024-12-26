const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

router.post('/bookappointment', appointmentController.bookAppointment);
router.get('/allappointments', appointmentController.getAllAppointments);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctorId);
router.get('/user/:userId', appointmentController.getAppointmentsByUserId);
router.get('/status/:status', appointmentController.getAppointmentsByStatus);
router.put('/change-status', appointmentController.changeAppointmentStatus);
router.put('/upload-report', appointmentController.uploadReport);

module.exports = router;
