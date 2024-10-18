import { Appointment } from "../models/appointmentModel.js";


export const bookAppointment = async (req, res) => {
  try {
    const { doctor, date, timeBooked } = req.body;
    const user = req.user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Login to make Appointment"
      })
    }
    if (!doctor || !date || !timeBooked) {
      return res.status(401).json({
        success: false,
        message: "Doctor, Date and Time is required"
      })
    }
    const patient = user._id
    const newAppointment = await Appointment.create({
      doctor, patient, timeBooked, date
    })
    return res.status(201).json({
      success: true,
      message: `Your Appointment is booked on ${date} at ${timeBooked}`,
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
    const { appointmentID } = req.body;
    const appointment = await Appointment.findByIdAndUpdate({ _id: appointmentID }, {
      cancel: true
    })
    if (!appointment) {
      return res.status(401).json({
        success: false,
        message: "Appointment is not found"
      })
    }
    return res.status(201).json({
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