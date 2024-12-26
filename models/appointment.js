const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patientUser',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorUsers',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancel', 'visited'],
    default: 'pending',
  },
  reasonForRejected: {
    type: String,
    default: null,
  },
  cancelReason: {
    type: String,
    default: null,
  },
  report: {
    type: String,
    default: null,
  },
  confirmedAt: {
    type: Date,
    default: null,
  },
  rejectedAt: {
    type: Date,
    default: null,
  },
  cancelAt: {
    type: Date,
    default: null,
  },
  visitedAt: {
    type: Date,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
