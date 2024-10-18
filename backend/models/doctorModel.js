import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  degree: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  about: { type: String, required: true },
  fee: { type: String },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  address: { type: String, required: true },
  availbillity: { type: Date },
  patientAttended: { type: Number },
  patientsList: {
    type: [{
      type: mongoose.Schema.ObjectId, ref: "User"
    }]
  },
  salary: { type: String }
}, { timestamps: true })

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

doctorSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Doctor = mongoose.model("Doctor", doctorSchema);
export { Doctor };