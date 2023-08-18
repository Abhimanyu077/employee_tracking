// Import the empTimesheetSchema model
const TimeSheetSchema = require("../../model/empTimesheetSchema");
const empLeaveSchema = require("../../model/empLeaveSchema");
const employeeSchema = require("../../model/employeeSchema");
const empNotificationSchema = require("../../model/empNotificationSchema");
const { transporter } = require("../../emailService");

module.exports = {
  //  ! This api holds all information of  empDashBoard
  employeeDashboard: async (req, res) => {
    try {
      //* Get the current date
      const today = new Date();
      // *Set the start of the day to 00:00:00.000
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      // *Set the end of the day to 23:59:59.999
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      // * Query the database for timesheet data created within the current day
      const empData = await TimeSheetSchema.find(
        {
          createdAt: {
            $gte: startOfDay, // *Greater than or equal to start of the day
            $lte: endOfDay, // * Less than or equal to end of the day 
          },
        },
        { _id: 0, clockIn: 1, clockOut: 1 } // * Select only clockIn and clockOut fields
      ).populate({ path: "empId", select: "empName" }); // * Populate 'empId' reference with 'empName' field
      // * Send a success response with fetched employee data
      res.status(200).json({
        success: true,
        message: "Employee data fetched successfully",
        empData: empData,
      });
    } catch (err) {
      // * Send an error response if there's an issue
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // ! Admin can reject or accept the leave

  leaveAcceptReject: async (req, res) => {
    try {
      const { id } = req.params;
      const { leaveStatus } = req.body;
      const type = await empLeaveSchema.findById(id);
      const employee = await employeeSchema.findById(type.empId);
      const leave = await empLeaveSchema.findByIdAndUpdate(
        id,
        { leaveStatus },
        { new: true }
      );
      const user = await empLeaveSchema.findById(leave.id);
      let emailText, emailColor;
      if (leaveStatus === "accepted") {
        if (type.leaveType === "casual") {
          user.casualLeave -= 1;
        }
        emailText = `Your leave is <span style="color: green;">accepted</span>.`;
        emailColor = "green";
      } else {
        emailText = `Your leave is <span style="color: red;">rejected</span>.`;
        emailColor = "red";
      }
      const htmlContent = `
            <html>
                <body>
                    <p style="color: ${emailColor};">${emailText}</p>
                </body>
            </html>
        `;
      let info = await transporter.sendMail({
        from: "fortestingapi2002@gmail.com",
        to: employee.empEmail,
        subject: "Regarding leave",
        text:
          leaveStatus === "accepted"
            ? "Your leave is accepted."
            : "Your leave is rejected.",
        html: htmlContent,
      });
      if (leaveStatus === "accepted" && type.leaveType === "sick") {
        user.sickLeave -= 1;
      }
      await Promise.all([leave.save(), user.save()]);
      res.status(201).json({
        success: true,
        message: "Leave status update",
        leave: leave,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // !  notification Api

  createNotification: async (req, res) => {
    const empId = req.params.id;
    const notification = new empNotificationSchema(req.body);
    try {
      notification.empId = empId;
      await notification.save();
      res.status(201).json({
        success: true,
        message: "Notification created",
        notification: notification,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error in ${err.message}`,
      });
    }
  },

  // !  update notification Api

  updateNotification: async (req, res) => {
    const Id = req.params.id;
    const notification = await empNotificationSchema.findByIdAndUpdate(
      Id,
      req.body,
      { new: true }``
    );
    try {
      res.status(201).json({
        success: true,
        message: "Notification update successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error in ${err.message}`,
      });
    }
  },

  // !  delete notification Api

  deleteNotification: async (req, res) => {
    const Id = req.params.id;
    const notification = await empNotificationSchema.findByIdAndDelete(
      Id,
      req.body,
      { new: true }
    );
    try {
      res.status(201).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error in ${err.message}`,
      });
    }
  },
};
