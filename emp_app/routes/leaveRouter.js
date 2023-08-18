const express = require("express");
const leave = require("../controller/empLeaveController");

const  leaveRouter = express.Router();

leaveRouter.post("/leave/:id", leave.empLeave);

module.exports = leaveRouter;
