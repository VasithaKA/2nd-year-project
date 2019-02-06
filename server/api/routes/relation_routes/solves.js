const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/relationships/Solve');
const Solve = mongoose.model('solves');

require('../../models/relationships/JobFault');
const JobFault = mongoose.model('jobFaults');

//set Job Fault
router.post('/', async (req, res) => {
    const existingJobFault = await Solve.findOne({ jobId: req.body.jobId, technicianId: req.body.technicianId })

    if (existingJobFault) {
        res.json({
            success: false,
            message: "Already set job"
        })
        return
    }
    const solve = new Solve({
        jobId: req.body.jobId,
        technicianId: req.body.technicianId,
        startTime: req.body.startTime,
        endTime: req.body.endtTime,
        status: req.body.status,
        mark: req.body.mark
    })
    await solve.save()
        .then(() => res.json({
            success: true,
            message: "Set job!"
        })
        )
})

//get completed Jobs are done by spec. Technician
router.get('/:technicianId', async (req, res) => {
    const completedJobs = await Solve.find({technicianId: req.params.technicianId, status:"complete"}).populate('jobId')
    res.json({
        completedJobs: completedJobs
    })
})

//get completed Jobs 
router.get('/complete/', async (req, res) => {
    const completedJobs = await Solve.find({status:"complete"},{jobId:1, _id:0})
    for (let j = 0; j < completedJobs.length; j++) {
        const faultsInAJob = await JobFault.find({jobId: completedJobs[j].jobId}).populate({ path: 'jobId', populate: { path: 'machineId', populate: { path: 'departmentId' } } }).populate({ path: 'faultId', populate: { path: 'faultCategoryId' } })
        var faultsInAJobs = []
        for (let i = 0; i < faultsInAJob.length; i++) {
            faultsInAJobs.push( { _id:faultsInAJob[i].jobId._id, jobId: faultsInAJob[i].jobId.jobId, date: faultsInAJob[i].jobId.date, description: faultsInAJob[i].jobId.description, faultImage: faultsInAJob[i].jobId.faultImage,serialNumber: faultsInAJob[i].jobId.machineId.serialNumber, departmentName: faultsInAJob[i].jobId.machineId.departmentId.departmentName, faultName:faultsInAJob[i].faultId.faultName, faultCategoryName:faultsInAJob[i].faultId.faultCategoryId.faultCategoryName} )
        }
    }
    res.json({
        completedJobsDetails: faultsInAJobs
    })
})

//get completed Jobs 
router.get('/incomplete/', async (req, res) => {
    const completedJobs = await Solve.find({status:"incomplete"},{jobId:1, _id:0})
    for (let j = 0; j < completedJobs.length; j++) {
        const faultsInAJob = await JobFault.find({jobId: completedJobs[j].jobId}).populate({ path: 'jobId', populate: { path: 'machineId', populate: { path: 'departmentId' } } }).populate({ path: 'faultId', populate: { path: 'faultCategoryId' } })
        var faultsInAJobs = []
        for (let i = 0; i < faultsInAJob.length; i++) {
            faultsInAJobs.push( { _id:faultsInAJob[i].jobId._id, jobId: faultsInAJob[i].jobId.jobId, date: faultsInAJob[i].jobId.date, description: faultsInAJob[i].jobId.description, faultImage: faultsInAJob[i].jobId.faultImage,serialNumber: faultsInAJob[i].jobId.machineId.serialNumber, departmentName: faultsInAJob[i].jobId.machineId.departmentId.departmentName, faultName:faultsInAJob[i].faultId.faultName, faultCategoryName:faultsInAJob[i].faultId.faultCategoryId.faultCategoryName} )
        }
    }
    res.json({
        completedJobsDetails: faultsInAJobs
    })
})

module.exports = router;