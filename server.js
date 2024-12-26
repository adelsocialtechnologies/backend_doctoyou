const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

const patientUser =  require('./routes/patientUserRoute')
const adminUser =  require('./routes/adminUserRoute')
const category =  require('./routes/categoriesRoute')
const doctorUser =  require('./routes/doctorUserRoute')
const appointment =  require('./routes/appointmentRoute')
const dailyReport = require('./routes/dailyreportRoute')
const monthlyReport= require('./routes/monthlyReport')
const authMiddleware = require('./Middleware/authMiddleware')

dotenv.config()
connectDB();
const app = express()
app.use(cors())
app.use(express())
app.use(morgan('dev'))
app.use(express.json());


app.get('/',(req,res) => {
    res.status(200).json({
        success:true,
        message:'Welcome to the Full Stack Doctoyou',
    });
});
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard' });
  });
app.use('/api', patientUser)
app.use('/api', adminUser)
app.use('/api',category)
app.use('/api',doctorUser)
app.use('/api',appointment)
app.use('/api', dailyReport)
app.use('/api', monthlyReport)

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server Running ${PORT}`.bgCyan.white);
})