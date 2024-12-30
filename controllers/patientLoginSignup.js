const patientUser = require('../models/patientUser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    // console.log(req.body);
  const { profilePhoto, name, email, contact, password } = req.body;

  try {
    const existingpatientUser = await patientUser.findOne({ email });
    if (existingpatientUser) {
      return res.status(400).json({ message: "patientUser already exists" }); 
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newpatientUser = new patientUser({
      profilePhoto,
      name,
      email,
      contact,
      password: hashedPassword,
      Date:Date.now()
    });

    await newpatientUser.save();
    return res.status(201).json({ message: "patientUser created successfully" }); 
  } catch (error) {
    return res.status(500).json({ message: "Server error", error }); 
  }
};

const login = async (req, res) => {
    // console.log(req.body)
  const { email, password } = req.body;
  try {
    const patient = await patientUser.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "patientUser not found" });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token;
    token = jwt.sign(
      { patientUserId: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllpatientUser = async (req, res) =>{
  try {
    const patient = await patientUser.find();
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve patientUser', error });
  }
}

const getPatientUserbyId= async(req, res) =>{
  const {patientId} = req.params;
  try {
    const patient = await patientUser.findById(patientId);
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve patientUser', error });
  }

}
module.exports = { signup, login  , getAllpatientUser , getPatientUserbyId};
