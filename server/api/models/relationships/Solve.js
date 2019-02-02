const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },
    startTime: { type: Date, required: true },
    endtTime: { type: Date, required: false },
    status: { type: String, required: true },
    mark: { type: Date, required: false }
});

mongoose.model('expertises', ExpertiseSchema);