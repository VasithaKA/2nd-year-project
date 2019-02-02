const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Role');
const Role = mongoose.model('roles');

module.exports = router;