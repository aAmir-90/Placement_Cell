const Student = require("../models/Student");

// create new student
exports.createStudent = async (req, res) => {
  try {
    const data = req.body;
    const student = new Student(data);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all student
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get student by Id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update student by Id
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const dataStudent = req.body;
    const student = await Student.findByIdAndUpdate(studentId, dataStudent, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete by Id
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// assign interview to student by studentID
exports.assignInterviewStudent = async (req, res) => {
  console.log("called");
  try {
    const { interviewId, studentId } = req.body;
    const selectedStudent = await Interview.findByIdAndUpdate(studentId);
    if (
      selectedStudent.interviews.map((elem) => elem.interviewId === interviewId)
    ) {
      res.status(409).json("Interview already exist");
    }
    console.log(interviewId, studentId, "this is body");
    selectedStudent.interviews.push(interviewId);
    await selectedStudent.save();
    res.status(200).json(selectedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
