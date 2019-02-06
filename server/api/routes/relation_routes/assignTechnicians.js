const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/relationships/AssignTechnician');
const AssignTechnician = mongoose.model('assignTechnicians');

require('../../models/Job');
const Job = mongoose.model('jobs');

require('../../models/relationships/JobFault');
const JobFault = mongoose.model('jobFaults');

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

//pending jobs
router.get('/pending/', async (req, res) => {
    const allJobs = await Job.find({}, {_id:1})

    var pendingJobs = [];
    for (let i = 0; i < allJobs.length; i++) {
        const assignTechnicians = await AssignTechnician.findOne({jobId: allJobs[i]._id})
        if(!assignTechnicians){
            const pendingJob = await Job.findById(allJobs[i]._id, {_id:1})
            pendingJobs.push(pendingJob)
        }
    }
    for (let j = 0; j < pendingJobs.length; j++) {
        const faultsInAJob = await JobFault.find({jobId: pendingJobs[j]._id}).populate({ path: 'jobId', populate: { path: 'machineId', populate: { path: 'departmentId' } } }).populate({ path: 'faultId', populate: { path: 'faultCategoryId' } })
        var faultsInAJobs = []
        for (let i = 0; i < faultsInAJob.length; i++) {
            faultsInAJobs.push( { _id:faultsInAJob[i].jobId._id, jobId: faultsInAJob[i].jobId.jobId, date: faultsInAJob[i].jobId.date, description: faultsInAJob[i].jobId.description, faultImage: faultsInAJob[i].jobId.faultImage,serialNumber: faultsInAJob[i].jobId.machineId.serialNumber, departmentName: faultsInAJob[i].jobId.machineId.departmentId.departmentName, faultName:faultsInAJob[i].faultId.faultName, faultCategoryName:faultsInAJob[i].faultId.faultCategoryId.faultCategoryName} )
        }
        res.json({
            pendingJobsDetails: faultsInAJobs
        })
    }
    // res.json({
    //     pendingJobs
    // })
})

module.exports = router;