const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empName: {
    type: String,
    require: true,
  },
  empEmail: {
    type: String,
    required: true,
  },
  empPhone: {
    type: Number,
    require: true,
  },
  empPassword: {
    type: String,
    require: true,
  },
  empCity: {
    type: String,
    require: true,
  },
  empGender: {
    type: String,
    require: true,
  },
  empAddress: {
    type: String,
    default: "",
  },
  empProfilePic: {
    type: String,
  },
  empWorkingStatus: {
    type: String,
    default: "working",
  },
  empRole: {
    type: String,
  },
  empTechnologies: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
employeeSchema.set("timestamps", true);
module.exports = mongoose.model("employee", employeeSchema);
