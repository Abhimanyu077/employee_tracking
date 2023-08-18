const express = require("express");

const timesheet = require("../controller/timeSheetController");

const timeSheetRouter = express.Router();

timeSheetRouter.post("/clockIn/:id", timesheet.clockIn);
timeSheetRouter.patch("/clockOut/:id", timesheet.clockOut);


module.exports = timeSheetRouter;
