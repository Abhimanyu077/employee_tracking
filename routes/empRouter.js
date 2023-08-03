let express = require("express");
let {registerEmployeeValidation,loginEmployeeValidation,resetPasswordValidation} = require("../validation/employee/empDataValidation");
const employee = require("../controller/empController");

let router = express.Router();

router.post("/create", registerEmployeeValidation, employee.employeeSignUp);
router.post("/login",loginEmployeeValidation,employee.employeeLogin);
router.post("/sendEmpResetPasswordEmail",employee.sendEmployeeResetPasswordEmail)

module.exports = router;
