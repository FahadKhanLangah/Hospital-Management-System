import { Admin } from "../models/adminModel.js";
import cloudinary from 'cloudinary';
import { Doctor } from "../models/doctorModel.js";

export const registerAdmin = async (req, res) => {
  try {
    const { name, password, email, phone, username } = req.body
    if (!name || !password || !email || !phone || !username) {
      return res.status(404).json({
        success: false,
        message: "Name, Password, Phone , username and Email is Required"
      })
    }
    let myCloud;
    if (req.file) {
      myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "fkshopingAvatar",
        width: 250,
        crop: "scale"
      })
    }
    const newUser = await Admin.create({
      name, password, username, email, phone,
      profilePic: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    })
    const options = {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    const token = newUser.getJWTToken()
    return res.cookie('token', token, options).status(201).json({
      success: true,
      message: "Admin Registered Successfully",
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "UserName and Password is Required"
      })
    }
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      })
    }
    const isCorrect = await admin.comparePassword(password);
    if (!isCorrect) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Credentials Sir"
      })
    }
    const options = {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    const token = admin.getJWTToken()
    res.cookie('token', token, options).status(201).json({
      success: true,
      message: "Admin Logged In Successfully",
      token,
      admin
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const AddDoctor = async (req, res) => {
  try {
    const { name, password, username, phone, degree, speciality, about, address } = req.body
    if (!name || !password || !username || !phone || !degree || !speciality || !about || !address) {
      return res.status(404).json({
        success: false,
        message: "These fields are required Name, password, username, phone, degree, speciality, about, Address "
      })
    }
    let url;
    if (speciality === "Gyneacologist") {
      url = "https://th.bing.com/th/id/OIP.RCbHGzyGgL4zRXKtiNMvfgHaE8?rs=1&pid=ImgDetMain"
    } else if (speciality === "Surgeon") {
      url = "https://www.pngkit.com/png/full/527-5270996_ken-masters-png.png"
    } else if (speciality === "Dentist") {
      url = "https://th.bing.com/th/id/R.217efe72d3f9cc843d6c30cf386a264e?rik=%2f6%2bbjSplRAzltQ&pid=ImgRaw&r=0"
    } else if (speciality === "Orthopaedic") {
      url = "https://th.bing.com/th/id/R.9699ae2bfaf329466ca4214855f4cadc?rik=W29EZCEIkMfPSg&pid=ImgRaw&r=0"
    } else if (speciality === "Physician") {
      url = "https://th.bing.com/th/id/OIP.HRKGOWsmyvLtRny0K7a-9wAAAA?w=474&h=474&rs=1&pid=ImgDetMain"
    } else {
      url = "https://th.bing.com/th/id/OIP.mxYhJ5UrZMWy7X49ZczpJwHaHa?rs=1&pid=ImgDetMain"
    }
    let myCloud = {
      public_id: "",
      secure_url: url
    };
    const newDoctor = await Doctor.create({
      name, password, username, phone, degree, speciality, about, address,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    })
    return res.status(201).json({
      success: true,
      message: `Dr. ${newDoctor.name} Registered Successfully`,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    return res.status(200).json({
      success: true,
      allDoctors
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const logoutAdmin = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      expires: new Date(Date.now())
    }
    return res.cookie('token', null, options).status(200).json({
      success: true,
      message: "Admin logged out Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getLoginAdmin = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      })
    }
    const isCorrect = await admin.comparePassword(password);
    if (!isCorrect) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Credentials Sir"
      })
    }
    const options = {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    const token = admin.getJWTToken()
    res.cookie('token', token, options).status(201).json({
      success: true,
      message: "Admin Logged In Successfully",
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllAdmin = async (req, res) => {
  try {
    const allAdmin = await Admin.find();
    return res.status(200).json({
      success: true,
      allAdmin
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}