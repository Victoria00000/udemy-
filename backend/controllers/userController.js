const User = require("../models/userModel");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const bcrypt = require("bcrypt");

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

    !validateEmail(email) ?? res.status(400).json({ message: "This email is invalid." });

    const check = await userModel.findOne({ email });
    check ?? res.status(400).json({ message: "This email address is already in use." }); 

    !validateLength(first_name,3,30) ?? res.status(400).json({ message: "This name must be between 3 and 30 characters." });

    !validateLength(last_name, 3, 30) ?? res.status(400).json({ message: "This last name must be between 3 and 30 characters." });

    !validateLength(password, 6, 40) ?? res.status(400).json({ message: "This password must be atleast 6 characters." });

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
      message: "Please go to your email",
    });
 
    res.json(user);

  } catch(err) { res.status(err.statusCode); } //cap.22
};
