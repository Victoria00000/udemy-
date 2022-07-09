const User = require("../models/userModel");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    !validateEmail(email) ?? res.status(400).json({ message: "This email address is invalid. Please try again." });

    const check = await userModel.findOne({ email });
    check ?? res.status(400).json({ message: "This email address is already in use. Please try again." }); 

    !validateLength(first_name,3,30) ?? res.status(400).json({ message: "This name must be between 3 and 30 characters. Please try again." });

    !validateLength(last_name, 3, 30) ?? res.status(400).json({ message: "This last name must be between 3 and 30 characters. Please try again." });

    !validateLength(password, 6, 40) ?? res.status(400).json({ message: "This password must be between 6 and 40 characters. Please try again." });

    const cryptedPassword = await bcrypt.hash(password, 12);
    
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m");
    console.log(emailVerificationToken);

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Please go to your email.",
    });

  } catch(err) { res.status(500).json({ message: err.message }); };
};


exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;

    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);

    if (check.verified == true) {
      return res.status(400).json({ message: "This email address already exist. Please try again." });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "This account has been activated successfully!" });
    };

  } catch (error) { res.status(500).json({ message: error.message }); };
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    !user ?? res.status(400).json({ message: "This email address isn't verified. Please try again." });

    const check = await bcrypt.compare(password, user.password);

    !check ?? res.status(400).json({ message: "This credentials are invalid. Please try again." });

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "This register was finished! Please go to check your email.",
    });

  } catch (error) { res.status(500).json({ message: error.message }); };
};


