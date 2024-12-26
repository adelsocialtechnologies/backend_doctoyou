const Appointment = require('../models/appointment');
const DailyReport = require('../models/dailyreport');
const MonthlyReport = require('../models/monthlyReport');


const updateDailyAndMonthlyReports = async (doctorId, status, increment, date) => {

  const dateStr = date.toISOString().split('T')[0];
  const monthStr = date.toISOString().slice(0, 7);
  const statusField = `${status}Appointment`;

  let dailyReport = await DailyReport.findOne({ Date: dateStr });
  if (!dailyReport) {
    dailyReport = new DailyReport({
      Date: dateStr,
      totalAppointment: 0,
      pendingAppointment: 0,
      confirmedAppointment: 0,
      rejectedAppointment: 0,
      cancelAppointment: 0,
      visited: 0,
      doctorData: [],
    });
  }

  let doctorData = dailyReport.doctorData.find((data) => data.doctorId.toString() === doctorId.toString());
  if (!doctorData) {
    doctorData = {
      doctorId,
      totalAppointment: 0,
      pendingAppointment: 0,
      confirmedAppointment: 0,
      rejectedAppointment: 0,
      cancelAppointment: 0,
      visited: 0,
    };
    dailyReport.doctorData.push(doctorData);
  }

  dailyReport.totalAppointment += increment;
  dailyReport[statusField] += increment;
  doctorData.totalAppointment += increment;
  doctorData[statusField] += increment;
  const doctorDataIndex = dailyReport.doctorData.findIndex((data) => data.doctorId.toString() === doctorId.toString());
  if (doctorDataIndex !== -1) {
    dailyReport.doctorData[doctorDataIndex] = doctorData;
  }


  let monthlyReport = await MonthlyReport.findOne({ Month: monthStr });
  if (!monthlyReport) {
    monthlyReport = new MonthlyReport({
      Month: monthStr,
      totalAppointment: 0,
      pendingAppointment: 0,
      confirmedAppointment: 0,
      rejectedAppointment: 0,
      cancelAppointment: 0,
      visited: 0,
      doctorData: [],
    });
  }

  let monthlyDoctorData = monthlyReport.doctorData.find((data) => data.doctorId.toString() === doctorId.toString());
  if (!monthlyDoctorData) {
    monthlyDoctorData = {
      doctorId,
      totalAppointment: 0,
      pendingAppointment: 0,
      confirmedAppointment: 0,
      rejectedAppointment: 0,
      cancelAppointment: 0,
      visited: 0,
    };
    monthlyReport.doctorData.push(monthlyDoctorData);
  }


  monthlyReport.totalAppointment += increment;
  monthlyReport[statusField] += increment;
  monthlyDoctorData.totalAppointment += increment;
  monthlyDoctorData[statusField] += increment;

  const monthlyDoctorDataIndex = monthlyReport.doctorData.findIndex((data) => data.doctorId.toString() === doctorId.toString());
  if (monthlyDoctorDataIndex !== -1) {
    monthlyReport.doctorData[monthlyDoctorDataIndex] = monthlyDoctorData;
  }
  await dailyReport.save();
  await monthlyReport.save();
};

// **Book Appointment**
exports.bookAppointment = async (req, res) => {
  const { userId, doctorId, appointmentDate, appointmentTime, problem } = req.body;

  try {
    const newAppointment = new Appointment({
      userId,
      doctorId,
      appointmentDate,
      appointmentTime,
      problem,
      status: 'pending',
      date: Date.now(),
    });

    const date = new Date(Date.now());
    await updateDailyAndMonthlyReports(doctorId, 'pending', 1, date);
    const savedAppointment = await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: savedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// **Change Appointment Status**
exports.changeAppointmentStatus = async (req, res) => {
  const { appointmentId, status, reason } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const previousStatus = appointment.status;
    appointment.status = status;

    if (status === 'rejected') {
      appointment.reasonForRejected = reason;
      appointment.rejectedAt = Date.now();
    } else if (status === 'cancel') {
      appointment.cancelReason = reason;
      appointment.cancelAt = Date.now();
    } else if (status === 'confirmed') {
      appointment.confirmedAt = Date.now();
    } else if (status === 'visited') {
      appointment.visitedAt = Date.now();
    }

    await updateDailyAndMonthlyReports(appointment.doctorId, previousStatus, -1, appointment.date);
    await updateDailyAndMonthlyReports(appointment.doctorId, status, 1, appointment.date);
    await appointment.save();

    res.status(200).json({ message: 'Appointment status updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error });
  }
};

// **Get All Appointments**
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};


// **Get Appointments by Doctor ID**
exports.getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// **Get Appointments by User ID**
exports.getAppointmentsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// **Get Appointments by Status**
exports.getAppointmentsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const appointments = await Appointment.find({ status });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// **Upload Report**
exports.uploadReport = async (req, res) => {
  const { appointmentId, reportPath } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.report = reportPath;
    await appointment.save();

    res.status(200).json({ message: 'Report uploaded successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading report', error });
  }
};
