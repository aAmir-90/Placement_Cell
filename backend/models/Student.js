const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  batch: {
    type: Number,
  },

  college: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["placed", "not_placed"],
    required: true,
  },

  score: {
    DSAFinalScore: {
      type: Number,
      required: true,
    },

    WebDFinalScore: {
      type: Number,
      required: true,
    },

    ReactFinalScore: {
      type: Number,
      required: true,
    },
  },

  interviews: [
    {
      interviewId: {
        type: String,
        require: true,
      },
      companyName: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
