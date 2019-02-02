const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Department');
const Department = mongoose.model('departments');

module.exports = router;