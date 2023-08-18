const express = require("express");

const {registerEmployeeValidation,loginEmployeeValidation,resetPasswordValidation,} = require("../validation/employee/empDataValidation");
const employee = require("../controller/empController");
const authService = require("../../middleware/authUser");
const { upload } = require("../middleware/empImageStorage");
const router = express.Router();

router.post("/create", registerEmployeeValidation, employee.employeeSignUp);
router.post("/login",authService.isEmployee,loginEmployeeValidation,employee.employeeLogin);
router.post("/sendEmpResetPasswordEmail",employee.sendEmployeeResetPasswordEmail);
router.post("/resetpassword/:id/:token", employee.employeeResetPassword);
router.post("/setNewPassword/:id/:token", employee.setNewPassword);
router.patch("/updatempdata/:id",upload.single("empProfilePic"),employee.updateProfilePic);

module.exports = router;
