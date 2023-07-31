const express = require("express");

const logger = require("./utils/logger");
require("dotenv").config;

const app = express();

const PORT = process.env.PORT || 7000;
const HOST = "localhost";

app.listen(PORT, () => {
  logger.info(`server started and running  on http://${HOST}:${PORT}`);
  console.log(`server is running on PORT : ${PORT}`);
});
