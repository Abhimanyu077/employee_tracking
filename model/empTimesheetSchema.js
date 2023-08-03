const mongoose = require("mongoose");

const empTimesheetSchema = new mongoose.Schema({
  empClockIn: {
    type: String,
    require: true,
  },
  empClockOut: {
    type: String,
    require: true,
  },
  empClockInIp: {
    type: String,
    require: true,
  },
  empWorkingFrom: {
    type: String,
    require: true,
  },
  empHourLogged: {
    type: String,
    default: "0",
  },
  empWorkingDays: {
    type: String,
    default: "0",
  },
  empDayPresent: {
    type: String,
    require: true,
  },
  empHalfDay: {
    type: String,
    default: "active",
  },
  empDayAbsent: {
    type: String,
    require: true,
  },
  empHolidays: {
    type: String,
    require: true,
  },
  empDaysLate: {
    type: String,
    require: true,
  },
  empAttendanceStatus: {
    type: String,
    require: true,
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

empTimesheetSchema.js.set("timestamps", true);
module.exports = mongoose.model("timesheet", empTimesheetSchema.js);
