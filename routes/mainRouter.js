let express = require("express");
const empRouter = require("./empRouter");

let commonRouter = express.Router();

commonRouter.use("/employee", empRouter);

module.exports = commonRouter;
