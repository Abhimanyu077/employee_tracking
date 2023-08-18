const mongoose = require("mongoose");

const empNotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require:true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: true,
  },
});

empNotificationSchema.set("timestamps", true);
module.exports = mongoose.model("notification", empNotificationSchema);
