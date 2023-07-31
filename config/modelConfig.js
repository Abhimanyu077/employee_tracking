const mongoose = require("mongoose");
const logger = require("../utils/logger");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParer: "true",
});
mongoose.connection.on("error", (err) => {
  logger.log("error", "mongoose connection error");
});
mongoose.connection.on("connected", (err, res) => {
  logger.log("info", "mongoose is connected");
});  