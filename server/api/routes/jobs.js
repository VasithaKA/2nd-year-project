const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

require('../models/Job');
const Job = mongoose.model('jobs');

module.exports = router;