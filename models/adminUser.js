const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profilePhoto: {
    type: String, 
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  Date:{
    type:Date,
    required:true,
    default:Date.now()
  }
});

module.exports = mongoose.model('adminUser', userSchema);
