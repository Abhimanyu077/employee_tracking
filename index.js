const express = require("express");
require("dotenv").config;

require("./config/modelConfig");
const logger = require("./utils/logger");

const mainRouter = require("./urls");

const app = express();

const PORT = process.env.PORT || 9000;
const HOST = "localhost";

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  logger.info(`server running  on http://${HOST}:${PORT}`);
  console.log(`server is running on PORT : ${PORT}`);
});
