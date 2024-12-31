const mongoose = require('mongoose');
const dailyReport = new mongoose.Schema({
    Date:{
        type:String,
        required:true
    },
    totalAppointment:{
        type:Number,
        required:true
    },
    pendingAppointment:{
        type:Number,
        required:true
    },
    confirmedAppointment:{
        type:Number,
        required:true
    },
    rejectedAppointment:{
        type:Number,
        required:true
    },
    cancelAppointment:{
        type:Number,
        required:true
    },
    visitedAppointment:{
        type:Number,
        required:true
    },

    doctorData:[{
        doctorId:{
             type: mongoose.Schema.Types.ObjectId,
                ref: 'DoctorUsers',
                required: true,
        },
        totalAppointment:{
            type:Number,
            required:true
        },
        pendingAppointment:{
            type:Number,
            required:true
        },
        confirmedAppointment:{
            type:Number,
            required:true
        },
        rejectedAppointment:{
            type:Number,
            required:true
        },
        cancelAppointment:{
            type:Number,
            required:true
        },
        visitedAppointment:{
            type:Number,
            required:true
        }
    }],

    
})

module.exports = mongoose.model('dailyReport', dailyReport);