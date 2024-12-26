const express = require('express');
const router = express.Router();
const dailyReportController = require('../controllers/dailyReport');


router.get('/dailyreports', dailyReportController.getAllReports);
router.get('/dailyreports/date/:date', dailyReportController.getReportByDate);
router.get('/dailyreports/today', dailyReportController.getTodayReport);
router.get('/dailyreports/doctor/:doctorId', dailyReportController.getReportByDoctorId);

module.exports = router;
