const adminUser = require('../models/adminUser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    // console.log(req.body);
  const { profilePhoto, name, email, contact, password } = req.body;

  try {
    const existingadminUser = await adminUser.findOne({ email });
    if (existingadminUser) {
      return res.status(400).json({ message: "adminUser already exists" }); 
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newadminUser = new adminUser({
      profilePhoto,
      name,
      email,
      contact,
      password: hashedPassword,
      Date:Date.now()
    });

    await newadminUser.save();
    return res.status(201).json({ message: "adminUser created successfully" }); 
  } catch (error) {
    return res.status(500).json({ message: "Server error", error }); 
  }
};

const login = async (req, res) => {
    // console.log(req.body)
  const { email, password } = req.body;
  try {
    const admin = await adminUser.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "adminUser not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token;
    token = jwt.sign(
      { adminUserId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAlladminUser = async (req, res) =>{
  try {
    const admin = await adminUser.find();
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve adminUser', error });
  }
}
module.exports = { signup, login  , getAlladminUser};
