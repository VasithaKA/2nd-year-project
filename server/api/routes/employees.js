const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');

require('../models/Employee');
const Employee = mongoose.model('employees');

module.exports = router;