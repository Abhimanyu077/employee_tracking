const { date } = require("joi");
const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  totalLeave: {
    type: String,
    require: true,
  },
  sickLeave: {
    type: String,
    default: "10",
  },
  casualLeave: {
    type: String,
    default: "10",
  },
  leaveStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  leaveType: {
    type: String,
    require: "casual",
  },
  message: {
    type: String,
    default: "no message",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  empId: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    require: true,
  },
});

empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empleave", empLeaveSchema);
