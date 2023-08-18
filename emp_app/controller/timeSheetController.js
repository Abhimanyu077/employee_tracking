const moment = require("moment");

const empTimesheetSchema = require("../../model/empTimesheetSchema");
const { ipAddress } = require("../../emailService");
const timeSheetLogger = require("../../utils/timeSheetLogger");
const ipService = require("../service/ipService");
const timeSheetRouter = require("../routes/timeSheetRouter");

module.exports = {
  clockIn: async (req, res) => {
    try {
      const empId = req.params.id;
      const empData = new empTimesheetSchema();
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const empIp = await ipService.ipAddress();
      empData.empId = empId;
      empData.clockIn = currentTime;
      empData.clockInIp = empIp;
      Data = await empData.save();
      timeSheetLogger.log("info", "clock out successfully"); //! For logger
      res.status(201).json({
        success: true,
        message: "Clock in successfully!",
        info: Data,
      });
    } catch (error) {
      timeSheetLogger.log("Error", "Error!"); //! For logger
      res.status(500).json({
        success: false,
        message: `Error in ${error.message}`,
      });
    }
  },

  clockOut: async (req, res) => {
    try {
      // * Extract the employee ID from the request parameters
      const timesheetId = req.params.id;
      // * Update the clockOut field of the employee timesheet using the current time
      const clockOutTime = await empTimesheetSchema.findByIdAndUpdate(
        timesheetId,
        { clockOut: moment().format("YYYY-MM-DD HH:mm:ss") }, // * Set the clockOut field
        { new: true } // * Return the updated document
      );
      // * Convert the clockIn and clockOut timestamps to moment objects
      const clockIn = moment(clockOutTime.clockIn, "YYYY-MM-DD HH:mm:ss");
      const clockOut = moment(clockOutTime.clockOut, "YYYY-MM-DD HH:mm:ss");
      // * Calculate the hours worked by finding the difference between clockOut and clockIn
      const hoursWorked = clockOut.diff(clockIn, "hours");
      // * Determine the employee's status based on the hours worked
      if (hoursWorked >= 8) {
        clockOutTime.status = "present"; // * Employee worked a full day
      } else if (hoursWorked <= 8) {
        clockOutTime.status = "half day"; // * Employee worked a half day
      } else {
        clockOutTime.status = "absent"; // * Employee didn't work enough hours
      }
      // * Update clockOutTime with the calculated values
      clockOutTime.hoursWorked = hoursWorked;
      clockOutTime.hourLogged = `${hoursWorked} hours`;
      timeSheetLogger.log("info", "clock out successfully"); //! For logger
      // * Respond with a success message and the modified clockOutTime
      res.status(200).json({
        success: true,
        message: "Clock out successful",
        info: clockOutTime,
      });
    } catch (error) {
      // * Handle any errors that might occur during the process
      timeSheetLogger.log("error", "Error!"); //! For logger
      res.status(500).json({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },
};
