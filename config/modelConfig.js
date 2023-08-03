const mongoose = require("mongoose");
const logger = require("../utils/logger");

// mongoose.connect(process.env.DATABASE || "mongodb+srv://abhimanyusinghrathore27:Abhi123@cluster0.mshgxmh.mongodb.net/employeeTracking", {
//   useNewUrlParser: "true",
// });

mongoose.connect("mongodb://127.0.0.1:27017/etsdb", {
  useNewUrlParser: "true",
});

mongoose.connection.on("connected", () => {
  // console.log("mongoose connected successfully");
  logger.log("info", "mongoose is connected");
});
mongoose.connection.on("error", (err) => {
  // console.log("mongoose connection error", err);
  logger.log("error", "mongoose connection error");
});
