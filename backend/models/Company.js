const mongoose = require("moongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  interviews: [
    {
      date: {
        type: Number,
        require: true,
      },
      studentId: {
        type: String,
        require: true,
      },
      result: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model('Company', companySchema);
