const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/EmployeeType');
const EmployeeType = mongoose.model('employeeTypes');

module.exports = router;