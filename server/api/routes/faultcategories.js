const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/FaultCategory');
const FaultCategory = mongoose.model('faultcategories');

module.exports = router;