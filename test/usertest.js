let server = require("../index");
var chai = require("chai");
let chaiHttp = require("chai-http");
let empRouter = require("../routes/empRouter");
let employeeSchema = require("../model/employeeSchema");

chai.should();
chai.use(chaiHttp);

//  SignUp

describe("POST /api/create", () => {
      it("IT should return emp details :", (done) => {
        const data = {
        empName:"ABhimanyu",
        empEmail: "abahimanyusinghrathore27@gmail.com",
        empPassword: "Abhi@123",
        empCity: "Ratlam",
        empGender:"male",
        empAddress:"mjr",
        empTechnologies:"nodejs",
        empWorkingStatus:"true"
        };
        chai
          .request(server)
          .post("/employee/create")
          .set("content-Type", "application/x-www-form-urlencoded")
          .field(data)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.a("object");
            res.body.should.have.property("success").eq(true);
            res.body.should.have
              .property("message")
              .eq("Employee registered successfully");
          });
        done();
      });
})    