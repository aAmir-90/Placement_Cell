const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');



// Routes for Interview CRUD operations
router.post('/', interviewController.createInterview);
router.get('/', interviewController.getAllInterviews);
router.get('/:id', interviewController.getInterviewById);
router.put('/:id', interviewController.updateInterview);
router.delete('/:id', interviewController.deleteInterview);
router.put('/allocate/:id', interviewController.assignStudentInterview)

module.exports = router;
