const mongoose = require("mongoose");

const empNotificationSchema = new mongoose.Schema({
  
  title: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    default:"10"
  },
  isActive: {
    type: Boolean,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: true,
  },
});

empNotificationSchema.set("timestamps", true);
module.exports = mongoose.model("notification", empNotificationSchema);
