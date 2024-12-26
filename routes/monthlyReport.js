const express = require('express');
const router = express.Router();
const monthlyReportController = require('../controllers/monthlyReport');

router.get('/monthlyreports', monthlyReportController.getAllReports);
router.get('/monthlyreports/month/:month', monthlyReportController.getReportByMonth);
router.get('/monthlyreports/presentMonth', monthlyReportController.getPresentMonthReport);
router.get('/monthlyreports/doctor/:doctorId', monthlyReportController.getReportByDoctorId);
module.exports = router;

