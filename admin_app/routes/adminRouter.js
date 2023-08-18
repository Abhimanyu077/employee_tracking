const express = require("express");

const admin = require("../../emp_app/controller/empController");
const { isAdmin } = require("../../middleware/authUser");
const admine = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/adminlogin", isAdmin, admin.employeeLogin);
adminRouter.get("/empdashboard", admine.employeeDashboard);
adminRouter.post("/leaveacceptreject/:id", admine.leaveAcceptReject);
adminRouter.post("/createNotification/:id", admine.createNotification);
adminRouter.patch("/updateNotification/:id", admine.updateNotification);
adminRouter.delete("/deleteNotification/:id", admine.deleteNotification);

module.exports = adminRouter;
