const express = require("express");

const bench = require("../controller/benchController");

const benchRouter = express.Router();

benchRouter.get("/benchemployee", bench.benchEmployee);
benchRouter.post("/updateEmpStatus", bench.updateEmpStatus);

module.exports = benchRouter;
