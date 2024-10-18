
export const loginDoctor = async (req, res) => {
  try {
    const { password, username } = req.body
    if (!password || !username) {
      return res.status(404).json({
        success: false,
        message: "username and Password is Required"
      })
    }
    const existedDoctor = await User.findOne({ username });
    if (!existedDoctor) {
      return res.status(404).json({
        success: false,
        message: "No Doctor found with this username"
      })
    }
    isCorrect = existedDoctor.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      })
    }
    const options = {
      httpOnly: true,
      sameSite: 'strict',  // Protect from CSRF attacks
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    const token = existedDoctor.getJWTToken();
    return res.cookie('token', token, options).status(201).json({
      success: true,
      message: "welcome Back",
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}