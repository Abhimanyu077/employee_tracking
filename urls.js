const express = require("express");

const empRouter = require("./emp_app/routes/empRouter");
const timeSheetRouter = require("./emp_app/routes/timeSheetRouter");
const leaveRouter = require("./emp_app/routes/leaveRouter");
const notificationRouter = require("./emp_app/routes/notificationRouter");
const adminRouter = require("./admin_app/routes/adminRouter");
const benchRouter = require("./admin_app/routes/benchRouter");

const commonRouter = express.Router();

commonRouter.use("/employee", empRouter);
commonRouter.use("/timesheet", timeSheetRouter);
commonRouter.use("/empleave", leaveRouter);
commonRouter.use("/empnotification", notificationRouter);
commonRouter.use("/admin", adminRouter);
commonRouter.use("/bench", benchRouter);

module.exports = commonRouter;
