//backend/index.js

const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');


//importing the router files
const jobsRoute = require("./routes/jobs"); 
const jobApplicationRoute = require("./routes/jobApplication");
const internshipApplicationRoute = require("./routes/internshipApplication");

const app = express();
app.use(express.json());
app.use(cors());

//connecting to the specific routes
app.use('/jobs', jobsRoute);
app.use('/jobApplication', jobApplicationRoute);
app.use('/internshipApplication', internshipApplicationRoute);

mongoose.connect('mongodb://localhost:27017/DevTech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const myServer = http.createServer(app);

myServer.listen(5001, () => console.log("Server is running!"));