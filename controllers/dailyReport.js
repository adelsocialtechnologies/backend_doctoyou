const DailyReport = require('../models/dailyreport'); 

const dailyReportController = {
    
  async getAllReports(req, res) {
    try {
      const reports = await DailyReport.find().sort({ Date: -1 }); 
      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch daily reports', details: err.message });
    }
  },


  async getReportByDate(req, res) {
    const { date } = req.params; // Expecting `date` in YYYY-MM-DD format
    try {
      const report = await DailyReport.findOne({ Date: date });
      if (!report) {
        return res.status(404).json({ message: 'No report found for the given date' });
      }
      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch report by date', details: err.message });
    }
  },


  async getTodayReport(req, res) {
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const report = await DailyReport.findOne({ Date: today });
      if (!report) {
        return res.status(404).json({ message: 'No report found for today' });
      }
      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch today\'s report', details: err.message });
    }
  },

 
  async getReportByDoctorId(req, res) {
    const { doctorId } = req.params; 
    try {
      const reports = await DailyReport.find({ 'doctorData.doctorId': doctorId }).sort({ Date: -1 });
      const doctorReports = reports.map((report) => {
        const doctorData = report.doctorData.find(
          (data) => data.doctorId.toString() === doctorId
        );
  
        if (doctorData) {
          return {
            date: report.Date, 
            doctorId: doctorData.doctorId,
            totalAppointment: doctorData.totalAppointment,
            pendingAppointment: doctorData.pendingAppointment,
            confirmedAppointment: doctorData.confirmedAppointment,
            rejectedAppointment: doctorData.rejectedAppointment,
            cancelAppointment: doctorData.cancelAppointment,
            visited: doctorData.visited,
            _id: doctorData._id,  
          };
        }
  
        return null; 
      }).filter(Boolean); 
  
      
      if (doctorReports.length === 0) {
        return res.status(404).json({ message: 'No data found for the given doctor ID' });
      }
  
     
      res.status(200).json(doctorReports);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch data by doctor ID', details: err.message });
    }
  }
  
};

module.exports = dailyReportController;
