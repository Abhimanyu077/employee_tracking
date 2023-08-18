const mongoose = require("mongoose");

const empTimesheetSchema = new mongoose.Schema({
  clockIn: {
    type: String,
    default: "0",
  },
  clockOut: {
    type: String,
    default: "0",
  },
  clockInIp: {
    type: String,
    default: "",
  },
  workingFrom: {
    type: String,
    default:"company"
  },
  hourLogged: {
    type: String,
    default: "0",
  },
  workingDays: {
    type: String,
    default: "0",
  },
  dayPresent: {
    type: String,
    default: "0",
  },
  halfDay: {
    type: String,
    default: "0",
  },
  dayAbsent: {
    type: String,
    require: true,
  },
  holidays: {
    type: String,
    default: "employee",
  },
  daysLate: {
    type: String,
    default: "0",
  },
  attendanceStatus: {
    type: String,
    default: "0",
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}); 

empTimesheetSchema.set("timestamps", true);
module.exports = mongoose.model("timesheet", empTimesheetSchema);
