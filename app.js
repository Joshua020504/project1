const express = require ('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

const app = express ();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Joshua Bondalo, PRO");
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/students', studentRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/courses', coursesRoutes);

const PORT = 5000;

app.listen(PORT, () =>{
     console.log(`Server is running on port ${PORT}`);
});