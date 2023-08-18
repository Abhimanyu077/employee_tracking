const express = require("express");
const notification = require("../controller/notificationController");

const notificationRouter = express.Router();

notificationRouter.post("/notification/:id", notification.createNotification);

module.exports = notificationRouter;
