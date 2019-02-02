const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Machine');
const Machine = mongoose.model('machines');

module.exports = router;