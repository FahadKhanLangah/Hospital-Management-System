import cloudinary from 'cloudinary'
import { User } from '../models/userModel.js'

export const registerUser = async (req, res) => {
  try {
    const { name, password, gender, age, phone, dob, address } = req.body
    if (!name || !password || !gender || !phone) {
      return res.status(404).json({
        success: false,
        message: "Name, Password, Phone and Gender is Required"
      })
    }
    let url;
    if (gender === "male") {
      url = "https://th.bing.com/th/id/OIP.Xwyfb9WSdh1AVuw5jyueXgHaHa?rs=1&pid=ImgDetMain"
    } else {
      url = "https://th.bing.com/th/id/OIP.mxYhJ5UrZMWy7X49ZczpJwHaHa?rs=1&pid=ImgDetMain"
    }
    let myCloud = {
      public_id: "",
      secure_url: url
    };
    if (req.file) {
      myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "fkshopingAvatar",
        width: 250,
        crop: "scale"
      })
    }
    const profilePic = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
    const newUser = await User.create({
      name, password, gender, age, phone, dob, address, profilePic
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
      message: "User Registered Successfully",
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { password, phone } = req.body
    if (!password || !phone) {
      return res.status(404).json({
        success: false,
        message: "Phone and Password is Required"
      })
    }

    const existedUser = await User.findOne({ phone: phone });
    if (!existedUser) {
      return res.status(404).json({
        success: false,
        message: "No user found with this phone number"
      })
    }
    const isCorrect = await existedUser.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      })
    }
    const options = {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    const token = existedUser.getJWTToken();
    return res.cookie('token', token, options).status(201).json({
      success: true,
      message: "welcome Back",
      token,
      user: existedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {


    const users = await User.find();
    if (users.length < 0) {
      return res.status(404).json({
        success: false,
        message: "No users yet"
      })
    }
    return res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      expires: new Date(Date.now())
    }
    return res.cookie('token', null, options).status(200).json({
      success: true,
      message: "Logout Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getLoginUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not available Please Login Again"
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { name, gender, age, phone, dob, address } = req.body
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No such user found"
      })
    }
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (age) user.age = age;
    if (dob) user.dob = dob;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (req.file) {
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "fkshopingAvatar",
        width: 250,
        crop: "scale"
      })
      user.profilePic.url = myCloud.secure_url;
      user.profilePic.public_id = myCloud.public_id;
    }
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User updated successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}