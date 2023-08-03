const express = require("express");
require("dotenv").config;

require("./config/modelConfig");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;
const HOST = "localhost";

const commonRouter = require("./routes/mainRouter");
app.use("/", commonRouter);

app.listen(PORT, () => {
  logger.info(`server started and running  on http://${HOST}:${PORT}`);
  console.log(`server is running on PORT : ${PORT}`);
});
