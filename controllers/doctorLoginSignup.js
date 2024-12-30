const doctorUser = require('../models/doctorUser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const {
    profilePhoto,
    name,
    email,
    phone,
    password,
    appointmentTime,
    consultantFees,
    hospital,
    categories,
    verification
  } = req.body;

  try {
    
    const existingDoctorUser = await doctorUser.findOne({ email });
    if (existingDoctorUser) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newDoctorUser = new doctorUser({
      profilePhoto,
      name,
      email,
      phone,
      password: hashedPassword,
      appointmentTime,
      consultantFees,
      verification,
      hospital: {
        name: hospital.name,
        location: hospital.location,
        hospitalImage: hospital.hospitalImage || [],
        specification: hospital.specification,
      },
      categories,
    });

  
    await newDoctorUser.save();

    return res
      .status(201)
      .json({ message: 'Doctor created successfully', doctor: newDoctorUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await doctorUser.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "doctorUser not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token;
    token = jwt.sign(
      { doctorUserId: doctor._id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAlldoctorUser = async (req, res) =>{
  try {
    const doctor = await doctorUser.find();
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve doctorUser', error });
  }
}

const aprovedDoctor = async (req, res) =>{
  const { doctorId } = req.params;
  try{
    const doctor=await doctorUser.findById(doctorId);
    if(!doctor)
    {
      return res.json({message:"Doctor not found"})
    }
    doctor.verification='approved';
    doctor.save();
    return res.json({message:"Doctor Approved Succesfully "})
  }
  catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  } 

}
module.exports = { signup, login  , getAlldoctorUser ,aprovedDoctor};
