const Interview = require("../models/Interview");
const Student = require("../models/Student");
const studentControllerMethods = require("./studentController");

// create new interview
exports.createInterview = async (req, res) => {
  try {
    const companyData = req.body;
    const interview = new Interview(companyData);
    await interview.save();
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    console.log(interviews, "selected interview");

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get interview by Id
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update interview by Id
exports.updateInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const data = req.body;
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete interview by Id
exports.deleteInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const interview = await Interview.findByIdAndDelete(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// assign student to interview by interviewID
exports.assignStudentInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const studentId = req.body;
    const selectedInterview = await Interview.findByIdAndUpdate(interviewId);
    const selectedStudent = await Student.findByIdAndUpdate(
      studentId.allocatedStudentId
    );
    if (
      selectedInterview.students.map(
        (elem) => elem.allocatedStudentId === allocatedStudentId
      )
    ) {
      res.status(409).json("Student already exist");
    }
    selectedInterview.students.push(studentId);
    selectedStudent.interviews.push(interviewId);
    await selectedInterview.save();
    await selectedStudent.save();
    const resObj = {
      selectedInterview: selectedInterview,
      selectedStudent: selectedStudent,
    };
    res.status(200).json(resObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
