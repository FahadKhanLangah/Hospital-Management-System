import { Appointment } from "../models/appointmentModel.js";


export const bookAppointment = async (req, res) => {
  try {
    const { doctor, date } = req.body;
    const user = req.user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Login to make Appointment"
      })
    }
    if (!doctor || !date) {
      return res.status(401).json({
        success: false,
        message: "Doctor and Date is required"
      })
    }
    const patient = user._id
    const newAppointment = await Appointment.create({
      doctor, patient,
      bookedDate: date
    })
    return res.status(201).json({
      success: true,
      message: `Your Appointment is booked on ${date.date.weekday} at ${date.time}`,
      newAppointment
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const appointmentID = req.params.id;
    const appointment = await Appointment.findByIdAndUpdate({ _id: appointmentID }, {
      cancel: true
    })
    if (!appointment) {
      return res.status(401).json({
        success: false,
        message: "Appointment is not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: `Your Appointment is cancelled`,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const myAppointments = async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Login to see Your Appointments"
      })
    }
    const patient = user._id
    const appointments = await Appointment.find({ patient: patient });
    if (!appointments) {
      return res.status(400).json({
        success: false,
        message: "You have not any Appointment"
      })
    }
    return res.status(200).json({
      success: true,
      appointments
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const allAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate({
      path: "patient",
      select: "-password"
    })
    .populate({
      path: "doctor",
      select: "-password"
    });
    if (!appointments) {
      return res.status(400).json({
        success: false,
        message: "No any Appointment to show"
      })
    }
    return res.status(200).json({
      success: true,
      appointments
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}