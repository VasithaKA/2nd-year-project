const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: { type: String, required: true }
});

mongoose.model('roles', RoleSchema);