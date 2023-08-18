const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const employeeSchema = require("../../model/employeeSchema");
const employeeLogger = require("../../utils/employeeLogger");
const authService = require("../service/authService");
const { transporter } = require("../../emailService");

module.exports = {
  employeeSignUp: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const empData = new employeeSchema(req.body);
    try {
      let isEmpExist = await authService.isEmployee(req.body.empEmail);
      if (isEmpExist) {
        employeeLogger.log(
          "error",
          "Employee already registered with this email."
        );
        res.status(409).json({
          success: false,
          message: "Employee is already registered with this email.",
        });
      } else {
        if (empData.empGender === "Male") {
          let filePath = path.join(__dirname, "..", "upload/male.png");
          empData.empProfilePic = filePath;
        } else {
          let filePath = path.join(__dirname, "..", "upload/");
          empData.empProfilePic = filePath;
        }
        empData.empPassword = await bcrypt.hash(req.body.empPassword, salt);
        const employee = await empData.save();
        employeeLogger.log("info", "Employee registered successfully");
        res.status(201).json({
          success: true,
          message: "Employee registered successfully",
          employee: employee,
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  employeeLogin: async (req, res) => {
    const { empEmail, empPassword } = req.body;
    try {
      let { value, token } = await authService.validateEmployee(
        empEmail,
        empPassword
      );
      if (value) {
        employeeLogger.log("info", "Login successfully");
        res.status(200).json({
          success: true,
          message: "Login successfully",
          accessToken: token,
        });
      } else {
        employeeLogger.log("error", "Invalid email and password");
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  sendEmployeeResetPasswordEmail: async (req, res) => {
    const { empEmail } = req.body;
    try {
      let { empData, token } = await authService.validateEmployee(
        req.body.empEmail
      );
      if (empData) {
        const link = `http://127.0.0.1:3000/employee/resetPassword/${empData._id}/${token}`;
        let info = await transporter.sendMail({
          from: "fortestingapi2002@gmail.com",
          to: empEmail,
          subject: "email for employee reset password",
          text: `<a href=${link}>click Here For Rest Password`,
        });
        employeeLogger.log("info", "Email Send Successfully");
        res.status(201).json({
          success: true,
          message: "Email Send Successfully ",
          token: token,
          userID: empData._id,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  //.......resetPassword API........

  employeeResetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
      const checkEmployee = await employeeSchema.findById(id);
      if (checkEmployee != null) {
        const secretKey = checkEmployee._id + process.env.SECRET_KEY;
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
          await employeeSchema.findByIdAndUpdate(checkEmployee._id, {
            $set: { empPassword: bcryptPassword },
          });
          employeeLogger.log("info", "Password update successfully");
          res.status(201).json({
            success: true,
            message: "Password update successfully",
          });
        } else {
          employeeLogger.log(
            "error",
            "Password and confirmPassword is not matched"
          );
          res.status(403).json({
            success: false,
            message: "Password and confirmPassword is not matched",
          });
        }
      } else {
        employeeLogger.log("error", "Your email is not correct");
        res.status(403).json({
          success: false,
          message: "Your email is not correct",
        });
      }
    } catch (error) {
      employeeLogger.log("error", `Error: ${error}`);
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  setNewPassword: async (req, res) => {
    const empId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
      const empData = await employeeSchema.findById(empId);
      const checkPass = await bcrypt.compare(oldPassword, empData.empPassword);
      if (checkPass) {
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, salt); // Remove parseInt()
          empData.empPassword = hashPassword;
          employeeLogger.log("info", "Password updated successfully");
          await empData.save(); // Save the updated employee data
          res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          employeeLogger.log(
            "error",
            "newPassword and confirmPassword do not match"
          );
          res.status(400).json({
            success: false,
            message: "newPassword and confirmPassword do not match",
          });
        }
      } else {
        employeeLogger.log("error", "Invalid email or password");
        res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateProfilePic: async (req, res) => {
    try {
      const empId = req.params.id;
      const empAddress = req.body.empAddress;
      const newProfilePic = req.file
        ? `/upload/empProfilePic${req.file.filename}`
        : undefined;
      const updatedEmployee = await employeeSchema.findByIdAndUpdate(
        empId,
        {
          empProfilePic: newProfilePic,
          empAddress: empAddress,
        },
        { new: true }
      );
      if (!updatedEmployee) {
        employeeLogger.log("error", "Employee not found");
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      } else {
        employeeLogger.log(
          "info",
          "Profile pic and address updated successfully"
        );
        res.status(200).json({
          success: true,
          message: "Profile pic and address updated successfully ✔",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
