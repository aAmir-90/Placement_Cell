// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const auth = require("../routes/auth");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

employeeSchema.pre("save", async function (next) {
  const employee = this;

  if (!employee.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(employee.password, salt);

    employee.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

employeeSchema.methods.comparePassword = async function (employeePassword) {
  try {
    const isMatch = await bcrypt.compare(employeePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Employee", employeeSchema);
