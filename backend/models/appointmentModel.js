import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.ObjectId, ref: "Doctor", required: true },
  patient: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  bookedDate: {
    time: { type: String, required: true },
    date: {
      dayNumber: { type: Number, required: true },
      weekday: { type: String, required: true }
    },
  },
  payment: { type: String, default: "pending" },
  cancel: { type: Boolean }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", appointmentSchema);
export { Appointment }