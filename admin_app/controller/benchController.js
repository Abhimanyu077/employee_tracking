const employeeSchema = require("../../model/employeeSchema");

module.exports = {
  benchEmployee: async (req, res) => {
    try {
      const empData = await employeeSchema.find(
        { role: "employee" },
        { _id: 0, empName: 1, empEmail: 1, empWorkingStatus: 1, updateAt: 1 }
      );
      res.status(200).json({
        success: true,
        message: "Employee list fetched successfully ",
        empData: empData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error in ${error.message}`,
      });
    }
  },

  updateEmpStatus: async (req, res) => {
    try {
      const { empEmail, empWorkingStatus } = req.body;
      const empData = await employeeSchema.findOneAndUpdate(
        { empEmail: empEmail },
        { empWorkingStatus: empWorkingStatus },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "working status update successfully",
        empData: empData,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error in ${err.message}`,
      });
    }
  },
};
