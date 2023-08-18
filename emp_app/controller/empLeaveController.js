const { Logger } = require("winston");

const empLeaveSchema = require("../../model/empLeaveSchema");
const leaveLogger = require("../../utils/empLeaveLogger");

module.exports = {
  empLeave: async (req, res) => {
    const empId = req.params.id;
    const leaveData = new empLeaveSchema(req.body);
    try {
      leaveData.empId = empId;
      await leaveData.save();
      if (leaveData.leaveType === "casual") {
        leaveLogger.log("info", "Applied for casual leaves");
        res.status(200).json({
          success: true,
          message: "Applied for casual leaves",
          leaveInfo: leaveData,
        });
      } else if (leaveData.leaveType === "sick") {
        leaveLogger.log("info", "Applied for sick leaves");
        res.status(200).json({
          success: true,
          message: "Applied for sick leaves",
          leaveInfo: leaveData,
        });
      } else {
        leaveLogger.log("info", "Applied for other leaves");
        res.status(200).json({
          success: true,
          message: "Applied for leaves",
          leaveInfo: leaveData,
        });
      }
    } catch (err) {
      leaveLogger.error("error", "error message");
      res.status(500).json({
        success: false,
        message: `Error in ${err.message}`,
      });
    }
  },
};
