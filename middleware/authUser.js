const employeeSchema = require("../model/employeeSchema");

module.exports = {
  isEmployee: async (req, res, next) => {
    const empData = await employeeSchema.findOne({
      role: req.body.role,
    });
    if (empData.role === "employee") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "admin is not authorized with this position",
      });
    }
  },

  isAdmin: async (req, res, next) => {
    const empData = await employeeSchema.findOne({
      role: req.body.role,
    });
    if (empData.role === "admin") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "employee is not authorized at the position of employee",
      });
    }
  },
};
