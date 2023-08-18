const empNotificationSchema = require("../../model/empNotificationSchema");

module.exports = {
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
};
