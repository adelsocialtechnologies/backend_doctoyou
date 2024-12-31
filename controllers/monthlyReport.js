const MonthlyReport = require('../models/monthlyReport'); 

const monthlyReportController = {
  
  async getAllReports(req, res) {
    try {
      const reports = await MonthlyReport.find().sort({ Month: -1 }); 
      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch monthly reports', details: err.message });
    }
  },


  async getReportByMonth(req, res) {
    const { month } = req.params; // Expecting `month` in YYYY-MM format
    try {
      const report = await MonthlyReport.findOne({ Month: month });
      if (!report) {
        return res.status(404).json({ message: 'No report found for the given month' });
      }
      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch report by month', details: err.message });
    }
  },

  
  async getPresentMonthReport(req, res) {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); 
      const report = await MonthlyReport.findOne({ Month: currentMonth });
      if (!report) {
        return res.status(404).json({ message: 'No report found for the current month' });
      }
      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch current month\'s report', details: err.message });
    }
  },

 
  async getReportByDoctorId(req, res) {
    const { doctorId } = req.params; 
    try {
      const reports = await MonthlyReport.find({ 'doctorData.doctorId': doctorId }).sort({ Month: -1 });
  
      const doctorReports = reports.map((report) => {
        const doctorData = report.doctorData.find(
          (data) => data.doctorId.toString() === doctorId
        );
  
        if (doctorData) {
          return {
            date: report.Month, 
            doctorId: doctorData.doctorId,
            totalAppointment: doctorData.totalAppointment,
            pendingAppointment: doctorData.pendingAppointment,
            confirmedAppointment: doctorData.confirmedAppointment,
            rejectedAppointment: doctorData.rejectedAppointment,
            cancelAppointment: doctorData.cancelAppointment,
            visitedAppointment: doctorData.visitedAppointment,
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

module.exports = monthlyReportController;
