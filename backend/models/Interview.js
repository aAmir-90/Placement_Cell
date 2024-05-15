const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    
    company: {
        type: String,
        required: true
    },

    students: [
        {
            allocatedStudentId: {
                type: String
            }
        }
    ],

    result: {
        type: String,
        enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        required: true
    },
});

module.exports = mongoose.model('Interview', interviewSchema);