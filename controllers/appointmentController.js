const mongoose = require('mongoose');
const { Types } = mongoose;
const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.bookAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentDate, reason } = req.body;

  if (!patientId || !doctorId || !appointmentDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const appointment = new Appointment({
      patientId: new Types.ObjectId(patientId),
      doctorId: new Types.ObjectId(doctorId),
      appointmentDate: new Date(appointmentDate),
      reason
    });

    await appointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while booking appointment",
      error: error.message
    });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const appointments = await Appointment.find({
      $or: [
        { patientId: new Types.ObjectId(userId) },
        { doctorId: new Types.ObjectId(userId) }
      ]
    })
      .populate('patientId', 'name email role')
      .populate('doctorId', 'name email role');

    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching appointments",
      error: error.message
    });
  }
};
