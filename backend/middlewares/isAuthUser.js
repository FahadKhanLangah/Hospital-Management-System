import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';

export const isAuthUser = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "Please Login First"
    })
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
}

export const isAuthorizedRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(404).json({
        success: false,
        message: `${req.user.role} is not allowed `
      })
    }
    next();
  }
}