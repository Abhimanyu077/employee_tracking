const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fortestingapi2002@gmail.com",
    pass: "aqmiidghsgoygvoa",
  },
});

module.exports = {
  transporter,
};
