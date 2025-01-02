const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email is already in use." });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    const token = newUser.generateToken();
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = user.generateToken();
    res
      .status(200)
      .json({ message: "Login successful", token, userData: user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  // const user = await User.findById(req.user.id);
  // if (user) {
  //   res.status(200).json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //   });
  // } else {
  //   res.status(404).json({ message: "User not found" });
  // }
};

module.exports = { registerUser, loginUser, getUserProfile };
