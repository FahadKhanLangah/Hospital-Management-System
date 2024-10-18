import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.ObjectId, ref: "doctor", required: true },
  patient: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  date: { type: Date, required: true },
  timeBooked: { type: Date, required: true },
  payment: { type: String, default: "pending" },
  cancel: { type: Boolean }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", appointmentSchema);
export { Appointment }