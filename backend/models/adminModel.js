import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: {
    public_id: String,
    url: String
  },
  role: { type: String, default: "admin" },
  password: { type: String, required: true },
  totalDoctors: { type: Number },
  totalPatientRegistered: { type: Number },
  totalRevenue: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  lastMonthRevenue: { type: Number, default: 0 },
  lastMonthExpenses: { type: Number, default: 0 },
  lastMonthProfit: { type: Number, default: 0 },
}, { timestamps: true });

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10);
})

adminSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}
adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

const Admin = mongoose.model("Admin", adminSchema);
export { Admin }