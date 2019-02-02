const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Fault');
const Fault = mongoose.model('faults');

module.exports = router;