const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeave: {
    type: String,
    require: true,
  },
  empSickLeave: {
    type: String,
    default: "10",
  },
  empCasualLeave: {
    type: String,
    default: "casual",
  },
  empLeaveStatus: {
    type: String,
    require: true,
  },
  empLeaveType: {
    type: String,
    require: true,
  },
  empMessage: {
    type: String,
    default: "0",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: true,
  },
});

empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empleave", empLeaveSchema);
