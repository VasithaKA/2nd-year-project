const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/relationships/AssignTechnician');
const AssignTechnician = mongoose.model('assignTechnicians');

//set Assign Technician
router.post('/', async (req, res) => {
    const existingAssignTechnician = await AssignTechnician.findOne({ jobId: req.body.jobId, technicianId: req.body.technicianId })

    if (existingAssignTechnician) {
        res.json({
            success: false,
            message: "Technician Assign already"
        })
        return
    }
    const assignTechnician = new AssignTechnician({
        jobId: req.body.jobId,
        technicianId: req.body.technicianId
    })
    await assignTechnician.save()
        .then(() => res.json({
            success: true,
            message: "Technician Assigned!"
        })
        )
})

//get Assign Technician Details
router.get('/technician/:technicianId', async (req, res) => {
    const assignTechnicianJobs = await AssignTechnician.find({technicianId: req.params.technicianId}).populate('jobId')
    res.json({
        assignTechnicianJobs: assignTechnicianJobs
    })
})

//get Assign Technician in a job
router.get('/job/:jobId', async (req, res) => {
    const assignTechnicians = await AssignTechnician.find({jobId: req.params.jobId}).populate('technicianId')
    if (assignTechnicians) {
        res.json({
            assignTechnicians: assignTechnicians
        })
    } else {
        res.json({
            status: "Pending"
        })
    }
})

module.exports = router;