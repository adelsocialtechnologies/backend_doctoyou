const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    profilePhoto:{
        type:String,
        required:true
    },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true, 
  },
  consultantFees:{
    type:String,
    required:true
  },
  hospital: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required:true
    },
    hospitalImage:[
        {
            type:String
        }
    ],
    specification:{
        type:String,
        required:true
    }
  },
  
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});


module.exports = mongoose.model('DoctorUsers', doctorSchema);
